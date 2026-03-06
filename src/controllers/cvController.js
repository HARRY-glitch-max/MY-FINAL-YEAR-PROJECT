import CV from "../models/CV.js";

// Upload CV (protected route)
export const uploadCV = async (req, res) => {
  try {
    const cv = await CV.create({
      user: req.user.id,
      fileUrl: req.file.path, // assuming you're using multer for file uploads
    });

    res.status(201).json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all CVs
export const getCVs = async (req, res) => {
  try {
    const cvs = await CV.find().populate("user", "name email");
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
