"use client";
import { useState, useEffect } from "react";

interface Subject {
  id: number;
  name: string;
  semester: number;
  courseId: number;
}

export default function FacultyForm() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [formData, setFormData] = useState({
    name: "",

    hallNumber: "",
    building: "",
    subjectId: "",
    phoneNumber:"",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch subjects
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/subjects");
        const data = await res.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/post-faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Faculty created successfully!");
        setFormData({
          name: "",
          hallNumber: "",
          building: "",
          subjectId: "",
          phoneNumber:"",
        });
      } else {
        setMessage("Failed to create faculty");
      }
    } catch (error){
      if (error instanceof Error) {
        setMessage(error.message);
      }
     
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2">
          Faculty Name:
        </label>
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
        <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
        <input type="number" 
        id="phoneNumber"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
        />
      </div>

      <div>
        <label htmlFor="hallNumber" className="block mb-2">
          Hall Number:
        </label>
        <input
          type="text"
          id="hallNumber"
          name="hallNumber"
          value={formData.hallNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="building" className="block mb-2">
          Building:
        </label>
        <input
          type="text"
          id="building"
          name="building"
          value={formData.building}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="subjectId" className="block mb-2">
          Subject:
        </label>
        <select
          id="subjectId"
          name="subjectId"
          value={formData.subjectId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Faculty
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
