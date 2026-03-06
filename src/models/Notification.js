import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // recipient
  type: { type: String, required: true },                                        // category of notification
  content: { type: String, required: true },                                     // actual message
  date: { type: Date, default: Date.now }                                        // when created
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
