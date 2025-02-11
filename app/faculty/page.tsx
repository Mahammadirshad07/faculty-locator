import { Suspense } from "react";
import FacultyDetails from "../components/FacultyDetails";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FacultyDetails />
    </Suspense>
  );
}
