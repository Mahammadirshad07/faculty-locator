'use client';
import { useState } from 'react';

export default function CourseForm() {
 
  const [message, setMessage] = useState('');
  const [formData,setFormData]= useState({
    name:'',
    semester:'',
  }

  )

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.semester) {
      setMessage("Name, Semester are required!");
      return;
    }
  
    const body ={
      name:formData.name,
      semester:formData.semester,
    }

    console.log("Sending request with body:", body);
    try {
      const res = await fetch('/api/admin/post-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      if (res.ok) {
        const responseData = await res.json();
        setMessage('Course created successfully!');
        console.log("Server response:", responseData);
        setFormData({ name: '',  semester: '' });
      } else {
        setMessage('Failed to create course');
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      }
     
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
        <label htmlFor="name" className="block mb-2">Course Name:</label>
        <input
          type="text"
          id="name"
          name='name'
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="semester" className="block mb-2">Semester:</label>
        <select
          id="semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Course
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}