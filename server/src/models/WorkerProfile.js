import mongoose from "mongoose";
//worker profile schema
const workerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skills: [String],
  experience: Number,
  pricePerHour: Number,
  availability: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
});

export default mongoose.model("WorkerProfile", workerProfileSchema);
