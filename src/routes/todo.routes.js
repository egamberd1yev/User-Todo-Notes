import { Router } from "express"
import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js"
import { validate } from "../middlewares/validate.middleware.js";
import { createTodoSchema } from "../validators/todo.validator.js";
import { protect } from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/", protect, getTodos)
router.get("/todos/:id", getTodo)
router.post("/", protect, createTodo)
router.put("/update/:id", updateTodo)
router.delete("/delete/:id", deleteTodo)

export default router