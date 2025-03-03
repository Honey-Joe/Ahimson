import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
   const fetchData = async()=>{
    try{
      const response = await axios.get("http://localhost:5000/api/alumni")
      setAlumni(response.data);
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
   }

   fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        {alumni.map((alum, index) => (
          <li key={index} className="p-4 border-b">
            <strong>{alum.name}</strong> - {alum.department}
            <img src={alum.profilePhoto} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
