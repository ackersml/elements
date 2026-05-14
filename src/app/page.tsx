import { redirect } from "next/navigation";

/** Root URL: Elements lives under `[locale]` (default catalog at `/en`). */
export default function RootPage() {
  redirect("/en");
}
