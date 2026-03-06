import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },                          // Full name
  email: { type: String, required: true, unique: true },           // Email address
  password: { type: String, required: true },                      // Login credentials
  roles: { type: String, enum: ["jobseeker", "employer", "admin"], default: "jobseeker" }, // User role
  skills: { type: [String], default: [] },                         // List of skills
  cv: { type: String },                                            // Resume file path or URL
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
