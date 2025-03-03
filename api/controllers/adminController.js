const Alumni = require("../models/Alumni");

exports.deleteAlumni = async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ message: "Alumni record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
