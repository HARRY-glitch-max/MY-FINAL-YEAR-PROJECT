import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    fileUrl: String
  },
  { timestamps: true }
);

export default mongoose.model("CV", cvSchema);