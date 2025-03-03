const express = require("express");
const { adminLogin, registerAdmin } = require("../controllers/authController");

const router = express.Router();

router.post("/login", adminLogin);

router.post("/create",registerAdmin);

module.exports = router;
