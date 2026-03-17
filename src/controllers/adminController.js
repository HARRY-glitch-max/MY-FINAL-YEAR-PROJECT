import Admin from "../models/Admin.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import Interview from "../models/Interview.js";
import generateToken from "../utils/generateToken.js";

// Register a new admin linked to employer
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, employerId } = req.body;

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({ name, email, password, employerId });
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      employerId: admin.employerId,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).populate("employerId");

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        employerId: admin.employerId,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate employer-scoped reports
export const getAdminReports = async (req, res) => {
  try {
    // Find the admin making the request
    const admin = await Admin.findById(req.user._id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const employerId = admin.employerId;

    // Jobs summary (only for this employer)
    const totalJobs = await Job.countDocuments({ employerId });
    const activeJobs = await Job.countDocuments({ employerId, status: "active" });
    const closedJobs = await Job.countDocuments({ employerId, status: "closed" });

    // Applications summary (only for jobs of this employer)
    const totalApplications = await Application.countDocuments({ employerId });
    const shortlistedApplications = await Application.countDocuments({ employerId, status: "shortlisted" });
    const hiredApplications = await Application.countDocuments({ employerId, status: "hired" });
    const rejectedApplications = await Application.countDocuments({ employerId, status: "rejected" });
    const pendingApplications = await Application.countDocuments({ employerId, status: "pending" });

    // Interviews summary (only for this employer)
    const totalInterviews = await Interview.countDocuments({ employerId });
    const completedInterviews = await Interview.countDocuments({ employerId, status: "completed" });
    const scheduledInterviews = await Interview.countDocuments({ employerId, status: "scheduled" });
    const cancelledInterviews = await Interview.countDocuments({ employerId, status: "cancelled" });

    res.json({
      jobs: {
        total: totalJobs,
        active: activeJobs,
        closed: closedJobs
      },
      applications: {
        total: totalApplications,
        shortlisted: shortlistedApplications,
        hired: hiredApplications,
        rejected: rejectedApplications,
        pending: pendingApplications
      },
      interviews: {
        total: totalInterviews,
        completed: completedInterviews,
        scheduled: scheduledInterviews,
        cancelled: cancelledInterviews
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
