import CV from "../models/CV.js";

export const uploadCV = async (req, res) => {
  const cv = await CV.create({
    user: req.user.id,
    fileUrl: req.file.path
  });

  res.status(201).json(cv);
};