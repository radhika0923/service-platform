const Booking = require("../models/Booking");

// GET /api/worker/profile
exports.workerProfile = async (req, res) => {
    res.json({ message: "Worker profile", user: req.user });
};

// GET /api/worker/tasks
exports.myTasks = async (req, res) => {
    try {
        const tasks = await Booking.find({ worker: req.user._id })
            .populate("customer", "name email phone");
        res.json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PATCH /api/worker/update-status/:taskId
exports.updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body; // "completed" or "pending"

    try {
        const booking = await Booking.findById(taskId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (!["pending", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        booking.status = status;
        await booking.save();

        res.json({ message: "Task status updated", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
