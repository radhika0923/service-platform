import express from "express";
import {
  createBooking,
  workerBookings,
  updateBookingStatus,
  confirmBooking
} from "../controllers/bookingController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Customer creates booking
router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  createBooking
);

// Worker sees bookings
router.get(
  "/worker",
  protect,
  authorizeRoles("worker"),
  workerBookings
);

// Worker updates status
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("worker"),
  updateBookingStatus
);

// Customer confirms completion
router.patch(
  "/:id/confirm",
  protect,
  authorizeRoles("customer"),
  confirmBooking
);

export default router;
