"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CourseSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [semester, setSemester] = useState(searchParams.get("semester") || "");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get("course") || "");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get("subject") || "");
  const [faculty, setFaculty] = useState([]);

  // Fetch Courses when semester changes
  useEffect(() => {
    if (semester) {
      fetch(`/api/courses?semester=${semester}`)
        .then((res) => res.json())
        .then((data) => setCourses(data));
    }
  }, [semester]);

  // Fetch Subjects when course changes
  useEffect(() => {
    if (selectedCourse) {
      fetch(`/api/subjects?courseId=${selectedCourse}`)
        .then((res) => res.json())
        .then((data) => setSubjects(data));
    }
  }, [selectedCourse]);

  // Fetch Faculty when subject changes
  useEffect(() => {
    if (selectedSubject) {
      fetch(`/api/faculty?subjectId=${selectedSubject}`)
        .then((res) => res.json())
        .then((data) => setFaculty(data));
    }
  }, [selectedSubject]);

  // Update URL with query params
  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-4">
      {/* Semester Selection */}
      {!semester ? (
        <div>
          <h2>Select Your Semester</h2>
          {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => (
            <button
              key={sem}
              onClick={() => {
                setSemester(sem);
                updateUrl("semester", sem);
              }}
              className="m-2 p-2 border"
            >
              Semester {sem}
            </button>
          ))}
        </div>
      ) : (
        <>
          {/* Course Selection */}
          <h2>Selected Semester: {semester}</h2>
          <h3>Select a Course</h3>
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourse(course.id);
                updateUrl("course", course.id);
              }}
              className="m-2 p-2 border"
            >
              {course.name}
            </button>
          ))}
        </>
      )}

      {/* Subject Selection */}
      {selectedCourse && (
        <>
          <h3>Select a Subject</h3>
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => {
                setSelectedSubject(subject.id);
                updateUrl("subject", subject.id);
              }}
              className="m-2 p-2 border"
            >
              {subject.name}
            </button>
          ))}
        </>
      )}

      {/* Faculty Selection */}
      {selectedSubject && (
        <>
          <h3>Available Faculty</h3>
          {faculty.map((f) => (
            <div key={f.id} className="border p-2">
              <p>Name: {f.name}</p>
              <p>Building: {f.building}</p>
              <button
                className="mt-2 p-2 border"
                onClick={() => router.push(`/faculty/${f.id}`)}
              >
                View Faculty Details
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
