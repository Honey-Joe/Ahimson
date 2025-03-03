const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const adminRoutes = require("./routes/adminRoutes"); // Import Admin Routes
const router = require("./routes/authRoutes");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/alumni", require("./routes/alumniRoutes"));
app.use("/api/admin", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
