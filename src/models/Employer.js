import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true }, // official name of the company
  contactInformation: {
    email: { type: String, required: true },     // communication details
    phone: { type: String },
    address: { type: String }
  },
  industry: { type: String, required: true }     // business sector
}, { timestamps: true });

const Employer = mongoose.model("Employer", employerSchema);
export default Employer;
