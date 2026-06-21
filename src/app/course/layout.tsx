import type { Metadata } from "next";
import type { ReactNode } from "react";
import { course } from "@/lib/course";

export const metadata: Metadata = {
  title: `${course.title} ${course.titleLine2} — ${course.instructor}`,
  description: course.pitch,
  openGraph: {
    title: `${course.title} ${course.titleLine2} — ${course.instructor}`,
    description: course.pitch,
  },
};

export default function CourseLayout({ children }: { children: ReactNode }) {
  return children;
}
