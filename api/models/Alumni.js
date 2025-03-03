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
  payment: {
    paymentStatus: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["UPI", "Card", "Net Banking", "Cash"] },
    transactionId: { type: String, unique: true },
  },
  accomplishments: { type: String },
  memorableEvents: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alumni", AlumniSchema);
