'use client';
import { useState } from 'react';

export default function CourseForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/post-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      
      if (res.ok) {
        setMessage('Course created successfully!');
        setName('');
      } else {
        setMessage('Failed to create course');
      }
    } catch (error) {
      setMessage('Error creating course');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">Course Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Course
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}