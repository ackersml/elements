// Neutralizes Klaviyo email popups, cookie scroll-lock, and chat widgets in the
// static Yatao clone so the offline copy is scrollable/clickable. Idempotent.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../reference/yatao/clone/", import.meta.url));
const MARKER = "clone-popup-fix";

const SNIPPET = `
<style id="${MARKER}-style">
  html, body { overflow-y: auto !important; height: auto !important; }
  body.klaviyo-prevent-body-scrolling { overflow: auto !important; }
  [class*="kl-private"], .klaviyo-form, [data-testid="klaviyo-form"],
  .needsclick[class*="kl-private"] { display: none !important; }
</style>
<script id="${MARKER}-script">
(function () {
  function unlock() {
    try {
      document.documentElement.style.overflowY = "auto";
      document.body && document.body.classList.remove("klaviyo-prevent-body-scrolling");
      if (document.body) document.body.style.overflow = "auto";
      document.querySelectorAll('[class*="kl-private"], .klaviyo-form, [data-testid="klaviyo-form"]').forEach(function (e) { e.remove(); });
    } catch (e) {}
  }
  unlock();
  document.addEventListener("DOMContentLoaded", unlock);
  new MutationObserver(unlock).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "style"] });
})();
</script>
`;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (extname(entry.name) === ".html") yield p;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function withRetry(fn, label) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === 5) throw err;
      console.warn(`  retry ${attempt} (${err.code}) ${label}`);
      await sleep(500 * attempt);
    }
  }
}

let patched = 0;
let skipped = 0;
let failed = 0;
for await (const file of walk(ROOT)) {
  try {
    const html = await withRetry(() => readFile(file, "utf8"), file);
    if (html.includes(MARKER)) { skipped++; continue; }
    let out;
    if (html.includes("</body>")) out = html.replace("</body>", SNIPPET + "</body>");
    else if (html.includes("</html>")) out = html.replace("</html>", SNIPPET + "</html>");
    else out = html + SNIPPET;
    await withRetry(() => writeFile(file, out, "utf8"), file);
    patched++;
  } catch (err) {
    failed++;
    console.error(`  FAILED ${file}: ${err.code}`);
  }
}
console.log(`Patched ${patched}, already-patched ${skipped}, failed ${failed}.`);
