import Employer from "../models/Employer.js";
import generateToken from "../utils/generateToken.js";

// Register employer
export const createEmployer = async (req, res) => {
  const { companyName, industry, contactInformation, password } = req.body;

  const employerExists = await Employer.findOne({ "contactInformation.email": contactInformation.email });
  if (employerExists) {
    return res.status(400).json({ message: "Employer already exists" });
  }

  const employer = await Employer.create({
    companyName,
    industry,
    contactInformation,
    password
  });

  if (employer) {
    res.status(201).json({
      _id: employer._id,
      companyName: employer.companyName,
      industry: employer.industry,
      contactInformation: employer.contactInformation,
      token: generateToken(employer._id)
    });
  } else {
    res.status(400).json({ message: "Invalid employer data" });
  }
};

// Login employer
export const loginEmployer = async (req, res) => {
  const { email, password } = req.body;
  const employer = await Employer.findOne({ "contactInformation.email": email });

  if (employer && (await employer.matchPassword(password))) {
    res.json({
      _id: employer._id,
      companyName: employer.companyName,
      industry: employer.industry,
      contactInformation: employer.contactInformation,
      token: generateToken(employer._id)
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// Get all employers
export const getEmployers = async (req, res) => {
  const employers = await Employer.find({});
  res.json(employers);
};

// Get employer by ID
export const getEmployerById = async (req, res) => {
  const employer = await Employer.findById(req.params.id);
  if (employer) {
    res.json(employer);
  } else {
    res.status(404).json({ message: "Employer not found" });
  }
};

// Update employer
export const updateEmployer = async (req, res) => {
  const employer = await Employer.findById(req.params.id);
  if (employer) {
    employer.companyName = req.body.companyName || employer.companyName;
    employer.industry = req.body.industry || employer.industry;
    employer.contactInformation = req.body.contactInformation || employer.contactInformation;
    if (req.body.password) employer.password = req.body.password;

    const updatedEmployer = await employer.save();
    res.json(updatedEmployer);
  } else {
    res.status(404).json({ message: "Employer not found" });
  }
};

// Delete employer
export const deleteEmployer = async (req, res) => {
  const employer = await Employer.findById(req.params.id);
  if (employer) {
    await employer.remove();
    res.json({ message: "Employer removed" });
  } else {
    res.status(404).json({ message: "Employer not found" });
  }
};

// Shortlist candidate
export const shortlistCandidate = async (req, res) => {
  res.json({ message: `Application ${req.params.id} shortlisted` });
};
