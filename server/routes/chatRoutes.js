import express from "express";
import {
  createTask,
  getTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
