import Employer from "../models/Employer.js";

// Create a new employer
export const createEmployer = async (req, res) => {
  try {
    const { companyName, contactInformation, industry } = req.body;

    const employer = new Employer({ companyName, contactInformation, industry });
    await employer.save();

    res.status(201).json({ message: "Employer created successfully", employer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all employers
export const getEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employer by ID
export const getEmployerById = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }
    res.json(employer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update employer
export const updateEmployer = async (req, res) => {
  try {
    const employer = await Employer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.json({ message: "Employer updated successfully", employer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete employer
export const deleteEmployer = async (req, res) => {
  try {
    const employer = await Employer.findByIdAndDelete(req.params.id);

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.json({ message: "Employer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
