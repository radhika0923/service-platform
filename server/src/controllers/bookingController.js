import Booking from "../models/Booking.js";

// CUSTOMER → create booking
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      customer: req.user.id,
      ...req.body
    });

    res.status(201).json({
      message: "Booking request sent",
      booking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// WORKER → view my bookings
export const workerBookings = async (req, res) => {
  const bookings = await Booking.find({ worker: req.user.id });
  res.json(bookings);
};

// WORKER → update booking status
export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findById(req.params.id);

  booking.status = status;
  await booking.save();

  res.json({
    message: "Booking status updated",
    booking
  });
};

// CUSTOMER → confirm completion
export const confirmBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking.status !== "completed") {
    return res.status(400).json({
      message: "Work not completed yet"
    });
  }

  booking.status = "confirmed";
  await booking.save();

  res.json({
    message: "Booking confirmed",
    booking
  });
};
