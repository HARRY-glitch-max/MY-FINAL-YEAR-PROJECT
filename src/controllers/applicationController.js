import Application from "../models/Application.js";

// Submit a new application
export const createApplication = async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    const application = new Application({ jobId, userId });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title")
      .populate("userId", "name email");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get applications for a specific job
export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId })
      .populate("userId", "name email");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get applications for a specific user
export const getApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await Application.find({ userId })
      .populate("jobId", "title");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete application
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
