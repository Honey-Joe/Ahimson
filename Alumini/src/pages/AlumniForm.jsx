import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AlumniForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    membershipType: "Life Member",
    departmentNo: "",
    name: "",
    presentPosition: "",
    status: "Single",
    religion: "",
    bloodGroup: "",
    birthday: "",
    weddingDay: "",
    address: "",
    education: [{ course: "", type: "Day Scholar", hostel: "" }],
    accomplishments: "",
    memorableEvents: "",
    image: null,
    payment: {
      paymentStatus: "Pending",
      amount: 0,
      paymentMethod: "UPI",
      transactionId: "",
    },
  });

  const [page, setPage] = useState(0);
  const pageTitles = [
    "Membership & Personal Details",
    "Dates & Address",
    "Education Details",
    "Accomplishments & Events",
    "Profile Photo & Submission",
    "Payment Details",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newEducation = [...prev.education];
      newEducation[index][name] = value;
      return { ...prev, education: newEducation };
    });
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { course: "", type: "Day Scholar", hostel: "" }],
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      payment: { ...prev.payment, [name]: value },
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    
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
        if (formData.profilePhoto) {
          data.append("profilePhoto", formData.profilePhoto);
        }
      } else if (key === "payment") {
        Object.keys(formData.payment).forEach((pKey) => {
          data.append(`payment[${pKey}]`, formData.payment[pKey]);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post("http://localhost:5000/api/alumni/register", data);
      alert("Registration Successful!");
      navigate("/");
    } catch (error) {
      alert("Error registering alumni");
      console.error(error);
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">{pageTitles[page]}</h2>

      {/* Page 1: Membership & Personal Details */}
      {page === 0 && (
        <div>
          <label className="block mb-2">Membership Type</label>
          <select name="membershipType" value={formData.membershipType} onChange={handleChange} className="w-full p-2 border rounded mb-2">
            <option value="Life Member">Life Member</option>
            <option value="Patron">Patron</option>
          </select>

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

      {/* Page 2: Dates & Address */}
      {page === 1 && (
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

      {/* Page 3: Education */}
      {page === 2 && (
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

      {/* Page 4: Accomplishments & Events */}
      {page === 3 && (
        <div>
          <textarea name="accomplishments" placeholder="Accomplishments" value={formData.accomplishments} onChange={handleChange} className="w-full p-2 border rounded mb-2"></textarea>
          <textarea name="memorableEvents" placeholder="Memorable Events" value={formData.memorableEvents} onChange={handleChange} className="w-full p-2 border rounded mb-2"></textarea>
        </div>
      )}

      {page === 4 && (
        <div>
          <select name="payment.paymentStatus" value={formData.payment.paymentStatus} onChange={handlePaymentChange} className="w-full p-2 border rounded mb-2">
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
          <input type="number" name="amount" placeholder="Amount" value={formData.payment.amount} onChange={handlePaymentChange} className="w-full p-2 border rounded mb-2" />
          <input type="text" name="transactionId" placeholder="Transaction ID" value={formData.payment.transactionId} onChange={handlePaymentChange} className="w-full p-2 border rounded mb-2" />
        </div>
      )}
      {/* Page 5: Profile Photo */}
      {page === 5 && (
        <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded mb-2" />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between">
        {page > 0 && <button onClick={() => setPage(page - 1)} className="bg-gray-400 text-white p-2 rounded">Back</button>}
        {page < 5 ? <button onClick={() => setPage(page + 1)} className="bg-blue-600 text-white p-2 rounded">Next</button> : <button onClick={handleSubmit} className="bg-green-600 text-white p-2 rounded">Submit</button>}
      </div>
    </div>
  </div>
  );
}
