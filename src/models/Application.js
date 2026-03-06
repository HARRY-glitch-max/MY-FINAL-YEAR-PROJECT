import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },   // links to Jobs table
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // links to Users table
  dateApplied: { type: Date, default: Date.now },                                // submission date
  status: { 
    type: String, 
    enum: ["submitted", "shortlisted", "rejected", "hired"], 
    default: "submitted" 
  }                                                                              // application state
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
