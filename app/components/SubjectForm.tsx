'use client';
import { useState, useEffect } from 'react';

interface Course {
  id: number;
  name: string;
}

export default function SubjectForm() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [formData, setFormData] = useState({
    name: '',
   
    courseId: '',
    facultyId: '', // Optional
  });
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch courses
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses');
        // console.log("couses are :",res)
        const data = await res.json();
       
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

 
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.name || !formData.courseId) {
      setMessage("Name, Semester, and Course are required!");
      return;
    }
  
    const body= {
      name: formData.name,
     
      courseId: parseInt(formData.courseId, 10),
    };
  
    if (formData.facultyId) {
      body.facultyId = parseInt(formData.facultyId, 10);
    }
  
    console.log("Sending request with body:", body);
  
    try {
      const res = await fetch('/api/admin/post-subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || "Failed to create subject");
      }
  
      const responseData = await res.json();
      console.log("Server response:", responseData);
      setMessage("Subject created successfully!");
      setFormData({ name: '',  courseId: '', facultyId: '' });
    } catch (error) {
      console.error("Error sending request:", error);
      setMessage(error.message);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">Subject Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      
      <div>
        <label htmlFor="courseId" className="block mb-2">Course:</label>
        <select
          id="courseId"
          name="courseId"
          value={formData.courseId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Subject
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
