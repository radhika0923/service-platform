import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { allUsers, approveWorker, allBookings } from "../controllers/adminController.js";

const router = express.Router();

router.get("/all-users", protect, authorizeRoles("admin"), allUsers);
router.patch("/approve-worker/:id", protect, authorizeRoles("admin"), approveWorker);
router.get("/all-bookings", protect, authorizeRoles("admin"), allBookings);

export default router;
