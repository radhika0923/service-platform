const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { allUsers, approveWorker, allBookings } = require("../controllers/adminController");

router.get("/all-users", protect, authorizeRoles("admin"), allUsers);
router.patch("/approve-worker/:id", protect, authorizeRoles("admin"), approveWorker);
router.get("/all-bookings", protect, authorizeRoles("admin"), allBookings);

module.exports = router;
