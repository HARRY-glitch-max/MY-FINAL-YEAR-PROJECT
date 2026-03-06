import Application from "../models/Application.js";

export const applyJob = async (req, res) => {
  const application = await Application.create({
    user: req.user.id,
    job: req.body.jobId
  });

  res.status(201).json(application);
};

export const getApplications = async (req, res) => {
  const applications = await Application.find()
    .populate("user")
    .populate("job");

  res.json(applications);
};