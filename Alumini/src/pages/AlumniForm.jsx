import { useState } from "react";
import axios from "axios";

export default function AlumniForm() {
  const [formData, setFormData] = useState({
    membershipType: "Life Member",
    departmentNo: "",
    name: "",
    presentPosition: "",
    status: "",
    religion: "",
    bloodGroup: "",
    birthday: "",
    weddingDay: "",
    address: "",
    education: [{ course: "", type: "Day Scholar", hostel: "" }],
    accomplishments: "",
    memorableEvents: "",
    profilePhoto: null,
  });

  const [page, setPage] = useState(0); // Pagination state

  // Page titles
  const pageTitles = ["Membership Type", "Personal Details", "Dates & Address", "Education", "Accomplishments", "Profile Photo"];

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle education field changes
  const handleEducationChange = (index, e) => {
    const newEducation = [...formData.education];
    newEducation[index][e.target.name] = e.target.value;
    setFormData({ ...formData, education: newEducation });
  };

  // Add new education field
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { course: "", type: "Day Scholar", hostel: "" }],
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const data = new FormData();

    // Append regular fields
    Object.keys(formData).forEach((key) => {
      if (key === "education") {
        formData.education.forEach((edu, index) => {
          data.append(`education[${index}][course]`, edu.course);
          data.append(`education[${index}][type]`, edu.type);
          if (edu.type === "Hosteller") {
            data.append(`education[${index}][hostel]`, edu.hostel);
          }
        });
      } else if (key === "profilePhoto") {
        data.append(key, formData[key]); // Append file directly
      } else {
        data.append(key, formData[key]); // Append other fields
      }
    });

    try {
      await axios.post("http://localhost:5000/api/alumni/register", data);
      alert("Registration Successful!");
    } catch (error) {
      alert("Error registering alumni");
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">{pageTitles[page]}</h2>

      {/* Page 1: Membership Type */}
      {page === 0 && (
        <div>
          <label className="block mb-2">Membership Type</label>
          <select name="membershipType" value={formData.membershipType} onChange={handleChange} className="w-full p-2 border rounded mb-2">
            <option value="Life Member">Life Member</option>
            <option value="Patron">Patron</option>
          </select>
        </div>
      )}

      {/* Page 2: Personal Details */}
      {page === 1 && (
        <div>
          <input type="text" name="departmentNo" placeholder="Department No" value={formData.departmentNo} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input type="text" name="presentPosition" placeholder="Present Position" value={formData.presentPosition} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <label className="block mb-2">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded mb-2">
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Spinster">Spinster</option>
          </select>
        </div>
      )}

      {/* Page 3: Dates & Address */}
      {page === 2 && (
        <div>
          <input type="text" name="religion" placeholder="Religion" value={formData.religion} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <input type="text" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <label className="block mb-2">Birthday</label>
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <label className="block mb-2">Wedding Day</label>
          <input type="date" name="weddingDay" value={formData.weddingDay} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded mb-2"></textarea>
        </div>
      )}

      {/* Page 4: Education */}
      {page === 3 && (
        <div>
          <h3 className="font-bold mb-2">Education Details</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="border p-4 mb-2 rounded">
              <input type="text" name="course" placeholder="Course" value={edu.course} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded mb-2" />
              <select name="type" value={edu.type} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded mb-2">
                <option value="Day Scholar">Day Scholar</option>
                <option value="Hosteller">Hosteller</option>
              </select>
              {edu.type === "Hosteller" && (
                <select name="hostel" value={edu.hostel} onChange={(e) => handleEducationChange(index, e)} className="w-full p-2 border rounded mb-2">
                  <option value="">Select Hostel</option>
                  <option value="NH">NH</option>
                  <option value="SH">SH</option>
                  <option value="BH">BH</option>
                </select>
              )}
            </div>
          ))}
          <button onClick={addEducation} className="bg-gray-500 text-white p-2 rounded">+ Add Education</button>
        </div>
      )}

      {/* Page 5: Accomplishments */}
      {page === 4 && (
        <textarea name="accomplishments" placeholder="Accomplishments" value={formData.accomplishments} onChange={handleChange} className="w-full p-2 border rounded mb-2"></textarea>
      )}

      {/* Page 6: Profile Photo */}
      {page === 5 && (
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded mb-2" />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between">
        {page > 0 && <button onClick={() => setPage(page - 1)} className="bg-gray-400 text-white p-2 rounded">Back</button>}
        {page < 5 ? <button onClick={() => setPage(page + 1)} className="bg-blue-600 text-white p-2 rounded">Next</button> : <button onClick={handleSubmit} className="bg-green-600 text-white p-2 rounded">Submit</button>}
      </div>
    </div>
  );
}
