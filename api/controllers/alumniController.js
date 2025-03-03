const Alumni = require("../models/Alumni");
const cloudinary = require('cloudinary').v2



exports.registerAlumni = async (req, res) => {
  try {

    const imageFile = req.file;
    // if (req.file) alumni.profilePhoto = req.file.path;
    // await alumni.save();

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
    const imageUrl = imageUpload.secure_url

    const data = {
      image: imageUrl,
      ...req.body,
    }

    const userdata = new Alumni(data);

    await userdata.save();

    res.status(201).json(userdata);

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
