import { HomepageOutline } from "@/app/components/home/HomepageOutline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage outline",
  robots: { index: false, follow: false },
};

export default function HomepageOutlinePage() {
  return <HomepageOutline />;
}
