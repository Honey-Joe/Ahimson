const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }


    res.json({ user: { email: user.email, } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create an admin user
    const adminUser = await Admin.create({
      
      email,
      passwordHash: hashedPassword,
     
    });

    res.status(201).json({ message: "Admin registered successfully", userId: adminUser._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to register admin" });
  }
};


// ✅ Create an Admin Account (One-time Use)


// ✅ Admin Login

