import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
  workerProfile,
  myTasks,
  updateTaskStatus
} from "../controllers/workerController.js";

const router = express.Router();

// Get worker profile
router.get(
  "/profile",
  protect,
  authorizeRoles("worker"),
  workerProfile
);

// Get tasks assigned to worker
router.get(
  "/tasks",
  protect,
  authorizeRoles("worker"),
  myTasks
);

// Update task status
router.patch(
  "/update-status/:taskId",
  protect,
  authorizeRoles("worker"),
  updateTaskStatus
);

export default router;
