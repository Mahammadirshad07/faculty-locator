"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Course, Subject, Faculty } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Building, BookOpen, GraduationCap, User, ChevronRight, ArrowLeft } from 'lucide-react';

const steps = ["Semester", "Course", "Subject", "Faculty"];

export default function CourseSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialSemester = searchParams.get("semester");
  const initialCourse = searchParams.get("course");
  const initialSubject = searchParams.get("subject");

  const [semester, setSemester] = useState<number | null>(
    initialSemester ? parseInt(initialSemester, 10) : null
  );
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(
    initialCourse ? parseInt(initialCourse, 10) : null
  );
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(
    initialSubject ? parseInt(initialSubject, 10) : null
  );
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (semester) {
      setLoading(true);
      fetch(`/api/courses?semester=${semester}`)
        .then((res) => res.json())
        .then((data) => {
          setCourses(data);
          setCurrentStep(1);
          setLoading(false);
        });
    }
  }, [semester]);

  useEffect(() => {
    if (selectedCourse) {
      setLoading(true);
      fetch(`/api/subjects?courseId=${selectedCourse}`)
        .then((res) => res.json())
        .then((data) => {
          setSubjects(data);
          setCurrentStep(2);
          setLoading(false);
        });
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedSubject) {
      setLoading(true);
      fetch(`/api/faculty?subjectId=${selectedSubject}`)
        .then((res) => res.json())
        .then((data) => {
          setFaculty(data);
          setCurrentStep(3);
          setLoading(false);
        });
    }
  }, [selectedSubject]);

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 3) {
        setSelectedSubject(null);
      } else if (currentStep === 2) {
        setSelectedCourse(null);
      } else if (currentStep === 1) {
        setSemester(null);
      }
    }
  };

  const gradientColors = [
    "from-purple-600 to-blue-600",
    "from-green-600 to-teal-600",
    "from-yellow-600 to-red-600",
    "from-pink-600 to-purple-600",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Faculty Finder
        </h1>
        <Card className="w-full p-6 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold">{steps[currentStep]}</h2>
                {currentStep > 0 && (
                  <Button variant="outline" onClick={goBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
              </div>
              <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem, index) => (
                      <Button
                        key={sem}
                        onClick={() => {
                          setSemester(sem);
                          updateUrl("semester", sem.toString());
                        }}
                        className={`h-32 text-xl font-bold text-white bg-gradient-to-br ${gradientColors[index % gradientColors.length]} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                      >
                        <GraduationCap className="mr-2 h-6 w-6" />
                        Semester {sem}
                      </Button>
                    ))}
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Select a Course</h3>
                    {loading ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <Select
                        onValueChange={(value) => {
                          setSelectedCourse(parseInt(value, 10));
                          updateUrl("course", value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose your course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id.toString()}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Select a Subject</h3>
                    {loading ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <Select
                        onValueChange={(value) => {
                          setSelectedSubject(parseInt(value, 10));
                          updateUrl("subject", value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose your subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.id.toString()}>
                              {subject.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="grid gap-4">
                    {loading ? (
                      Array(3).fill(0).map((_, index) => (
                        <Skeleton key={index} className="h-24 w-full" />
                      ))
                    ) : (
                      faculty.map((f, index) => (
                        <motion.div
                          key={f.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Card className={`hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${gradientColors[index % gradientColors.length]} text-white `}>
                            <CardContent className="flex items-center p-6">
                              <div className="flex-shrink-0 mr-6">
                                <User className="h-16 w-16" />
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-2xl font-bold mb-2">{f.name}</h3>
                                <p className="text-lg flex items-center">
                                  <Building className="h-5 w-5 mr-2" /> {f.building}
                                </p>
                              </div>
                              <Button
                                onClick={() => router.push(`/faculty?${f.id}`)}
                                variant="secondary"
                                className="ml-4 bg-white text-black hover:bg-opacity-90"
                              >
                                <BookOpen className="h-5 w-5 mr-2" />
                                Details
                                <ChevronRight className="h-5 w-5 ml-2" />
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Course, Subject, Faculty } from "@prisma/client";

// export default function CourseSelection() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   // Parse URL params to numbers where appropriate
//   const initialSemester = searchParams.get("semester");
//   const initialCourse = searchParams.get("course");
//   const initialSubject = searchParams.get("subject");

//   const [semester, setSemester] = useState<number | null>(
//     initialSemester ? parseInt(initialSemester, 10) : null
//   );
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [selectedCourse, setSelectedCourse] = useState<number | null>(
//     initialCourse ? parseInt(initialCourse, 10) : null
//   );
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [selectedSubject, setSelectedSubject] = useState<number | null>(
//     initialSubject ? parseInt(initialSubject, 10) : null
//   );
//   const [faculty, setFaculty] = useState<Faculty[]>([]);

//   // Fetch Courses when semester changes
//   useEffect(() => {
//     if (semester) {
//       fetch(`/api/courses?semester=${semester}`)
//         .then((res) => res.json())
//         .then((data) => setCourses(data));
//     }
//   }, [semester]);

//   // Fetch Subjects when course changes
//   useEffect(() => {
//     if (selectedCourse) {
//       fetch(`/api/subjects?courseId=${selectedCourse}`)
//         .then((res) => res.json())
//         .then((data) => setSubjects(data));
//     }
//   }, [selectedCourse]);

//   // Fetch Faculty when subject changes
//   useEffect(() => {
//     if (selectedSubject) {
//       fetch(`/api/faculty?subjectId=${selectedSubject}`)
//         .then((res) => res.json())
//         .then((data) => setFaculty(data));
//     }
//   }, [selectedSubject]);

//   // Update URL with query params
//   const updateUrl = (key: string, value: string) => {
//     const params = new URLSearchParams(window.location.search);
//     params.set(key, value);
//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="p-4">
//       {/* Semester Selection */}
//       {!semester ? (
//         <div>
//           <h2>Select Your Semester</h2>
//           {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => (
//             <button
//               key={sem}
//               onClick={() => {
//                 const semNumber = parseInt(sem, 10);
//                 setSemester(semNumber);
//                 updateUrl("semester", sem);
//               }}
//               className="m-2 p-2 border"
//             >
//               Semester {sem}
//             </button>
//           ))}
//         </div>
//       ) : (
//         <>
//           {/* Course Selection */}
//           <h2>Selected Semester: {semester}</h2>
//           <h3>Select a Course</h3>
//           {courses.map((course) => (
//             <button
//               key={course.id}
//               onClick={() => {
//                 setSelectedCourse(course.id);
//                 updateUrl("course", course.id.toString());
//               }}
//               className="m-2 p-2 border"
//             >
//               {course.name}
//             </button>
//           ))}
//         </>
//       )}

//       {/* Subject Selection */}
//       {selectedCourse && (
//         <>
//           <h3>Select a Subject</h3>
//           {subjects.map((subject) => (
//             <button
//               key={subject.id}
//               onClick={() => {
//                 setSelectedSubject(subject.id);
//                 updateUrl("subject", subject.id.toString());
//               }}
//               className="m-2 p-2 border"
//             >
//               {subject.name}
//             </button>
//           ))}
//         </>
//       )}

//       {/* Faculty Selection */}
//       {selectedSubject && (
//         <>
//           <h3>Available Faculty</h3>
//           {faculty.map((f) => (
//             <div key={f.id} className="border p-2">
//               <p>Name: {f.name}</p>
//               <p>Building: {f.building}</p>
//               <button
//                 className="mt-2 p-2 border"
//                 onClick={() => router.push(`/faculty/${f.id}`)}
//               >
//                 View Faculty Details
//               </button>
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }


