const User = require("../models/User");
const Booking = require("../models/Booking");

// GET /api/admin/all-users
exports.allUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/admin/approve-worker/:id
exports.approveWorker = async (req, res) => {
    const { id } = req.params;
    try {
        const worker = await User.findById(id);
        if (!worker || worker.role !== "worker") {
            return res.status(404).json({ message: "Worker not found" });
        }

        worker.approved = true; // add `approved` field to User schema for workers
        await worker.save();

        res.json({ message: "Worker approved", worker });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/admin/all-bookings
exports.allBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("customer", "name email phone")
            .populate("worker", "name email phone");
        res.json({ bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
