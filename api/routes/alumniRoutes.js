const express = require("express");
const { registerAlumni, getAlumniList } = require("../controllers/alumniController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", upload.single("image"), registerAlumni);
router.get("/", getAlumniList);

module.exports = router;
