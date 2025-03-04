import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AlumniDetails = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/alumni/${id}`
        );
        setAlumni(response.data);
      } catch (err) {
        setError("Failed to fetch alumni details");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center mt-5">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Profile Image */}
      {alumni.image && (
        <div className="flex justify-center mb-4">
          <img
            src={alumni.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        </div>
      )}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {alumni.name}
      </h2>

      <div className="space-x-4">
        <p>
          <span className="font-semibold">Membership Type:</span>{" "}
          {alumni.membershipType}
        </p>
        <p>
          <span className="font-semibold">Department No:</span>{" "}
          {alumni.departmentNo}
        </p>
        <p>
          <span className="font-semibold">Present Position:</span>{" "}
          {alumni.presentPosition}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {alumni.status}
        </p>
        <p>
          <span className="font-semibold">Religion:</span> {alumni.religion}
        </p>
        <p>
          <span className="font-semibold">Blood Group:</span>{" "}
          {alumni.bloodGroup}
        </p>
        <p>
          <span className="font-semibold">Birthday:</span>{" "}
          {new Date(alumni.birthday).toDateString()}
        </p>
        {alumni.weddingDay && (
          <p>
            <span className="font-semibold">Wedding Day:</span>{" "}
            {new Date(alumni.weddingDay).toDateString()}
          </p>
        )}
        <p>
          <span className="font-semibold">Address:</span> {alumni.address}
        </p>

        {/* Education Details */}
        <div>
          <h3 className="font-bold text-lg">Education</h3>
          {alumni.education.map((edu, index) => (
            <div key={index} className="p-3 border rounded mt-2">
              <p>
                <span className="font-semibold">Course:</span> {edu.course}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {edu.type}
              </p>
              {edu.type === "Hosteller" && (
                <p>
                  <span className="font-semibold">Hostel:</span> {edu.hostel}
                </p>
              )}
            </div>
          ))}
        </div>

        <p>
          <span className="font-semibold">Accomplishments:</span>{" "}
          {alumni.accomplishments}
        </p>
        <p>
          <span className="font-semibold">Memorable Events:</span>{" "}
          {alumni.memorableEvents}
        </p>
      </div>
    </div>
  );
};

export default AlumniDetails;
