import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminPage() {
  const [alumni, setAlumni] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/alumni");
        setAlumni(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Filter alumni based on search query
  const filteredAlumni = alumni.filter((alum) =>
    alum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alum.departmentNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alum.education.some((e) => e.course.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search alumni by name, department, or course..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <ul className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {filteredAlumni.length > 0 ? (
          filteredAlumni.map((alum) => (
            <div key={alum._id} className="border border-gray-300 p-5 flex flex-col gap-3 rounded-lg shadow-md">
              <div>
                <img src={alum.image} alt="" className="w-full object-cover rounded" />
              </div>
              <div className="grid grid-cols-2">
                <p className="font-semibold">Name:</p>
                <p>{alum.name}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="font-semibold">Department No:</p>
                <p>{alum.departmentNo}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="font-semibold">Education:</p>
                <div>
                  {alum.education.map((e, index) => (
                    <p key={index} className="text-sm">{e.course}</p>
                  ))}
                </div>
              </div>
              <div>
                <button className="border px-5 py-2 border-black rounded-lg bg-blue-500 text-white">
                  <Link to={`/alum/${alum._id}`}>See Details</Link>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No alumni found.</p>
        )}
      </ul>
    </div>
  );
}
