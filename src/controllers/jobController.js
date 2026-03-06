import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.id
  });

  res.status(201).json(job);
};

export const getJobs = async (req, res) => {
  const jobs = await Job.find().populate("createdBy", "name");

  res.json(jobs);
};