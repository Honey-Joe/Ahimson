const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Initialize express app
const app = express();
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect("mongodb+srv://honeyjoe942:honeyjoe0511@alumni.riv5r.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Multer storage configuration
const storage = multer.memoryStorage(); // Store images in memory as Buffer
const upload = multer({ storage });

// Create the registration schema
const registrationSchema = new mongoose.Schema({
  photo: {
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  departmentNo: String,
  name: String,
  position: String,
  status: String,
  bloodGroup: String,
  address: {
    flatNo: String,
    street: String,
    city: String,
    pinCode: String,
    mobile: String,
    email: String,
  },
  courseStudied: {
    puc: String,
    ug: String,
    pg: String,
  },
  accomplishments: String,
  honorsReceived: String,
  positionHeld: String,
  memorableEvents: String,
  relativesStudied: String,
  suggestions: String,
});

// Create the model
const Registration = mongoose.model("Registration", registrationSchema);

// API endpoint to handle the form submission
app.post("/members", upload.single("photo"), async (req, res) => {
  try {
    const formData = req.body;

    // If an image is uploaded, store it as a Buffer with its content type
    if (req.file) {
      formData.photo = {
        image: {
          data: req.file.buffer, // Store image data as Buffer
          contentType: req.file.mimetype, // Store the content type (e.g., 'image/jpeg')
        },
      };
    }

    // Save the form data in MongoDB
    const registration = new Registration(formData);
    await registration.save();

    res.status(200).json({ message: "Registration Successful!" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Error submitting form" });
  }
});

// Admin schema
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Admin model
const Admin = mongoose.model("Admin", adminSchema);

// Admin registration (for initial setup, you can remove this after creating an admin)
app.post("/admin/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password:password });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" ,data:admin});
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Error registering admin" });
  }
});
// Admin login without bcrypt and jwt
app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful",token:admin._id });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Error logging in admin" });
  }
});

// Middleware to authenticate admin without jwt

// Adm

// Route to get all members (protected)
app.get("/admin/members", async (req, res) => {
  try {
    const members = await Registration.find();
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ message: "Error fetching members" });
  }
});
// Serve the uploaded files

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
