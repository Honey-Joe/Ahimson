const mongoose = require("mongoose");

const AlumniSchema = new mongoose.Schema({
  membershipType: { type: String, required: true, enum: ["Life Member", "Patron"] },
  departmentNo: { type: String, required: true },
  name: { type: String, required: true },
  presentPosition: { type: String },
  status: { type: String, enum: ["Married", "Single", "Spinster"] },
  religion: { type: String },
  bloodGroup: { type: String },
  birthday: { type: Date },
  weddingDay: { type: Date },
  address: { type: String, required: true },
  education: [
    {
      course: String,
      type: { type: String, enum: ["Day Scholar", "Hosteller"] },
      hostel: { type: String, enum: ["NH", "SH", "BH"] },
    },
  ],
  accomplishments: { type: String },
  memorableEvents: { type: String },
  profilePhoto: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alumni", AlumniSchema);
