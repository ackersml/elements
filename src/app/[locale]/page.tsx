import { ElementsHomeView } from "@/app/components/home/ElementsHomeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find your sound",
};

export default function HomePage() {
  return <ElementsHomeView />;
}
