
'use client';
import { useState } from 'react';

import SubjectForm from '../components/SubjectForm';
import FacultyForm from '../components/FacultyForm';
import CourseForm from '../components/CourseForm';
export default function AdminPage() {
  const [activeForm, setActiveForm] = useState<'course' | 'subject' | 'faculty' | null>(null);

  return (
    <div className="container mx-auto p-4 pt-6 ">
      <div className="space-x-4 mb-8 flex justify-center">
        <button
          onClick={() => setActiveForm('course')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Course
        </button>
        <button
          onClick={() => setActiveForm('subject')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Subject
        </button>
        <button
          onClick={() => setActiveForm('faculty')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Faculty
        </button>
      </div>

      <div className="pt-16 flex justify-center">
        {activeForm === 'course' && <CourseForm />}
        {activeForm === 'subject' && <SubjectForm />}
        {activeForm === 'faculty' && <FacultyForm />}
      </div>
    </div>
  );
}