import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    serviceType: {
      type: String,
      required: true // any specific service types can be added
    },
    date: Date,
    hours: Number,
    address: String,
    amount: Number,
    status: {
      type: String,
      enum: [
        "requested",
        "accepted",
        "in_progress",
        "completed",
        "confirmed",
        "cancelled"
      ],
      default: "requested"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
