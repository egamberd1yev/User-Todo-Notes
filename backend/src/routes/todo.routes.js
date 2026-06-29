import { Router } from "express"
import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js"
import { protect } from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/", protect, getTodos)
router.get("/:id", protect, getTodo)
router.post("/", protect, createTodo)
router.put("/:id", protect, updateTodo)
router.delete("/:id", protect, deleteTodo)

export default router