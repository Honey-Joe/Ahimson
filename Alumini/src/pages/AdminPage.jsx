import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/alumni").then((res) => setAlumni(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        {alumni.map((alum, index) => (
          <li key={index} className="p-4 border-b">
            <strong>{alum.name}</strong> - {alum.department}
          </li>
        ))}
      </ul>
    </div>
  );
}
