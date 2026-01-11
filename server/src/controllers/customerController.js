const Booking = require("../models/Booking");
const User = require("../models/User");

// GET /api/customer/profile
exports.customerProfile = async (req, res) => {
    res.json({ message: "Customer profile", user: req.user });
};

// POST /api/customer/book-worker
exports.bookWorker = async (req, res) => {
    const { workerId, task, date, time } = req.body;

    try {
        const worker = await User.findById(workerId);
        if (!worker || worker.role !== "worker") {
            return res.status(400).json({ message: "Invalid worker selected" });
        }

        const booking = await Booking.create({
            customer: req.user._id,
            worker: workerId,
            task,
            date,
            time,
        });

        res.status(201).json({ message: "Booking created", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// GET /api/customer/my-bookings
exports.myBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ customer: req.user._id })
            .populate("worker", "name email phone");
        res.json({ bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.availableWorkers = async (req, res) => {
    try {
        const workers = await User.find({ role: "worker", approved: true }).select("name email phone");
        res.json({ workers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};