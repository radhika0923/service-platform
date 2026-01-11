const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { customerProfile, bookWorker, myBookings } = require("../controllers/customerController");
const { availableWorkers } = require("../controllers/customerController");

router.get("/available-workers", protect, authorizeRoles("customer"), availableWorkers);
router.get("/profile", protect, authorizeRoles("customer"), customerProfile);
router.post("/book-worker", protect, authorizeRoles("customer"), bookWorker);
router.get("/my-bookings", protect, authorizeRoles("customer"), myBookings);

module.exports = router;
