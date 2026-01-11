const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { workerProfile, myTasks, updateTaskStatus } = require("../controllers/workerController");

router.get("/profile", protect, authorizeRoles("worker"), workerProfile);
router.get("/tasks", protect, authorizeRoles("worker"), myTasks);
router.patch("/update-status/:taskId", protect, authorizeRoles("worker"), updateTaskStatus);

module.exports = router;
