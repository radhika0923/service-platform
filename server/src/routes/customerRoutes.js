import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { customerProfile, bookWorker, myBookings, availableWorkers } from "../controllers/customerController.js";

const router = express.Router();

router.get("/available-workers", protect, authorizeRoles("customer"), availableWorkers);
router.get("/profile", protect, authorizeRoles("customer"), customerProfile);
router.post("/book-worker", protect, authorizeRoles("customer"), bookWorker);
router.get("/my-bookings", protect, authorizeRoles("customer"), myBookings);
export default router;
