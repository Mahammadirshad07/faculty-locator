"use client";

import { Suspense } from "react";
import CourseSelection from "../components/CourseSelection";

export default function LocateFacultiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseSelection />
    </Suspense>
  );
}
