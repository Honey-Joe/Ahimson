import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    photo: {
      image: null,          // To hold the image as a file
      contentType: "",      // To hold the image content type (e.g., 'image/jpeg')
    },
    departmentNo: "",
    name: "",
    position: "",
    status: "",
    bloodGroup: "",
    address: {
      flatNo: "",
      street: "",
      city: "",
      pinCode: "",
      mobile: "",
      email: ""
    },
    courseStudied: {
      puc: "",
      ug: "",
      pg: ""
    },
    accomplishments: "",
    honorsReceived: "",
    positionHeld: "",
    memorableEvents: "",
    relativesStudied: "",
    suggestions: ""
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // If the field is a file input (photo upload), handle it differently
    if (type === "file") {
      const file = e.target.files[0];

      setFormData((prev) => ({
        ...prev,
        photo: {
          image: file,                 // Store the selected file
          contentType: file.type,      // Store the file's MIME type (e.g., 'image/jpeg')
        },
      }));
    } else if (name.includes(".")) {
      // Handle nested fields like address and courseStudied
      const [parentKey, childKey] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the data including the file
    const formDataObject = new FormData();
    
    // Append the form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key === "address" || key === "courseStudied") {
        Object.keys(formData[key]).forEach((nestedKey) => {
          formDataObject.append(`${key}[${nestedKey}]`, formData[key][nestedKey]);
        });
      } else if (key === "photo") {
        // Handle the photo file
        if (formData.photo.image) {
          formDataObject.append("photo", formData.photo.image);
        }
      } else {
        formDataObject.append(key, formData[key]);
      }
    });

    try {
      await axios.post("http://localhost:5000/members", formDataObject, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensures the file is handled properly
        },
      });
      alert("Registration Successful!");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-950 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-xl font-bold text-center text-red-950 mb-4">Registration Form</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Personal Information */}
          <fieldset className="border border-gray-300 p-4 rounded-lg">
            <legend className="text-lg font-semibold text-gray-700">Personal Information</legend>
            <div className="space-y-2">
              <label className="block text-gray-600">Upload Photo</label>
              <input
                type="file"
                name="photo"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
              <p className="text-gray-600 text-sm mt-1">{formData.photo.image ? formData.photo.image.name : "No file selected"}</p>
              <label className="block text-gray-600">Department No.</label>
              <input
                type="text"
                name="departmentNo"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
              <label className="block text-gray-600">Name (Rev/Dr/Mr/Ms/Sr)</label>
              <input
                type="text"
                name="name"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
              <label className="block text-gray-600">Present Position</label>
              <input
                type="text"
                name="position"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          {/* Address Section */}
          <fieldset className="border border-gray-300 p-4 rounded-lg">
            <legend className="text-lg font-semibold text-gray-700">Address</legend>
            <div className="space-y-2">
              <label className="block text-gray-600">Flat No.</label>
              <input
                type="text"
                name="address.flatNo"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
              <label className="block text-gray-600">Street</label>
              <input
                type="text"
                name="address.street"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                name="address.city"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
              <label className="block text-gray-600">Pin Code</label>
              <input
                type="text"
                name="address.pinCode"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
              <label className="block text-gray-600">Mobile</label>
              <input
                type="text"
                name="address.mobile"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="address.email"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          {/* Course Studied Section */}
          <fieldset className="border border-gray-300 p-4 rounded-lg">
            <legend className="text-lg font-semibold text-gray-700">Course Studied</legend>
            <div className="space-y-2">
              <label className="block text-gray-600">PUC</label>
              <input
                type="text"
                name="courseStudied.puc"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
              />
              <label className="block text-gray-600">UG</label>
              <input
                type="text"
                name="courseStudied.ug"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
              />
              <label className="block text-gray-600">PG</label>
              <input
                type="text"
                name="courseStudied.pg"
                className="w-full border p-2 rounded-lg"
                onChange={handleChange}
              />
            </div>
          </fieldset>

          {/* Other Fields Section */}
          <label className="block text-gray-600">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            className="w-full border p-2 rounded-lg"
            onChange={handleChange}
            required
          />

          <label className="block text-gray-600">Accomplishments</label>
          <textarea
            name="accomplishments"
            className="w-full border p-2 rounded-lg"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>

          <label className="block text-gray-600">Honors Received</label>
          <textarea
            name="honorsReceived"
            className="w-full border p-2 rounded-lg"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>

          <label className="block text-gray-600">Position Held</label>
          <textarea
            name="positionHeld"
            className="w-full border p-2 rounded-lg"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>

          <label className="block text-gray-600">Memorable Events</label>
          <textarea
            name="memorableEvents"
            className="w-full border p-2 rounded-lg"
            rows="3"
            onChange={handleChange}
          ></textarea>

          <label className="block text-gray-600">Relatives Studied</label>
          <textarea
            name="relativesStudied"
            className="w-full border p-2 rounded-lg"
            rows="3"
            onChange={handleChange}
          ></textarea>

          <label className="block text-gray-600">Suggestions</label>
          <textarea
            name="suggestions"
            className="w-full border p-2 rounded-lg"
            rows="3"
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
