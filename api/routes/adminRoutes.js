const express = require("express");
const { deleteAlumni } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.delete("/delete/:id", authMiddleware, deleteAlumni);

module.exports = router;
