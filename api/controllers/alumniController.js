const Alumni = require("../models/Alumni");

exports.registerAlumni = async (req, res) => {
  try {
    const alumni = new Alumni(req.body);
    if (req.file) alumni.profilePhoto = req.file.path;
    await alumni.save();
    res.status(201).json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAlumniList = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
