import Interview from "../models/Interview.js";
import Application from "../models/Application.js";
import Notification from "../models/Notification.js";

// Candidate books interview slot
export const bookInterview = async (req, res) => {
  try {
    const { jobId, preferredDate, preferredTime, location } = req.body;
    const userId = req.user._id;

    // Verify candidate is shortlisted
    const application = await Application.findOne({ userId, jobId });
    if (!application || application.status !== "shortlisted") {
      return res.status(400).json({ message: "You must be shortlisted to book an interview." });
    }

    // Save interview
    const interview = new Interview({
      userId,
      jobId,
      date: new Date(preferredDate),
      time: preferredTime,
      location,
      status: "scheduled"
    });
    await interview.save();

    // Create notifications
    await Notification.create({
      userId,
      type: "interview",
      content: `Your interview for job ${jobId} has been scheduled on ${preferredDate} at ${location}.`
    });

    await Notification.create({
      userId: application.employerId,
      type: "interview",
      content: `Candidate ${userId} booked an interview for job ${jobId} on ${preferredDate} at ${location}.`
    });

    res.status(201).json({ message: "Interview booked successfully", interview });
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
