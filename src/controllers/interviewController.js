import Interview from "../models/Interview.js";
import Application from "../models/Application.js";
import Notification from "../models/Notification.js";
import Job from "../models/Job.js";
import mongoose from "mongoose";

// Employer books interview slot for a shortlisted candidate
export const bookInterview = async (req, res) => {
  try {
    const { jobId, candidateId, scheduledDate, scheduledTime, location } = req.body;
    const employerId = req.user._id;

    // Verify candidate is shortlisted
    const application = await Application.findOne({ userId: candidateId, jobId });
    if (!application || application.status !== "shortlisted") {
      return res.status(400).json({ message: "Candidate must be shortlisted before booking an interview." });
    }

    const interview = new Interview({
      userId: candidateId,
      jobId,
      employerId,
      date: new Date(scheduledDate),
      time: scheduledTime,
      location,
      status: "scheduled"
    });
    await interview.save();

    // Notify candidate
    await Notification.create({
      userId: candidateId,
      type: "interview",
      content: `You have been scheduled for an interview for job ${jobId} on ${scheduledDate} at ${location}.`
    });

    // Notify employer
    await Notification.create({
      userId: employerId,
      type: "interview",
      content: `You booked an interview with candidate ${candidateId} for job ${jobId} on ${scheduledDate} at ${location}.`
    });

    res.status(201).json({ message: "Interview booked successfully by employer", interview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employer views interviews for a job
export const getInterviewsByJob = async (req, res) => {
  try {
    const interviews = await Interview.find({ jobId: req.params.jobId })
      .populate("userId", "name email");
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Candidate views their interviews
export const getInterviewsByUser = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.params.userId })
      .populate("jobId", "title description");
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get interview by ID
export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid interview ID format" });
    }
    const interview = await Interview.findById(id)
      .populate("jobId", "title")
      .populate("userId", "name email");
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employer submits interview result
export const submitInterviewResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { result, feedback } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid interview ID format" });
    }

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    interview.result = result;       // e.g. "passed", "failed", "pending"
    interview.feedback = feedback;   // optional notes
    interview.status = "completed";
    await interview.save();

    // Notify candidate
    await Notification.create({
      userId: interview.userId,
      type: "interview_result",
      content: `Your interview result for job ${interview.jobId} is: ${result}.`
    });

    res.json({ message: "Interview result submitted successfully", interview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Candidate or employer views interview result
export const getInterviewResult = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid interview ID format" });
    }

    const interview = await Interview.findById(id)
      .populate("jobId", "title")
      .populate("userId", "name email");

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (!interview.result) {
      return res.status(404).json({ message: "Interview result not available yet" });
    }

    res.json({ result: interview.result, feedback: interview.feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
