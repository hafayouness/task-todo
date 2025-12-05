import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";
import {
  createTask,
  getTasksByUser,
  updateTaskStatus,
  getAllTasks,
  updateTask,
  patchTask,
  deleteTask,
} from "../controllers/TaskController.js";

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/user/:userId", authMiddleware, getTasksByUser);
router.patch("/update-status/:taskId", authMiddleware, updateTaskStatus);
router.get("/all", authMiddleware, getAllTasks);
router.put("/update/:taskId", authMiddleware, updateTask);
router.patch("/patch/:taskId", authMiddleware, patchTask);
router.delete("/delete/:taskId", authMiddleware, deleteTask);

export default router;
