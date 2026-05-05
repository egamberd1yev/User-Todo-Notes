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

const router = Router()

router.get("/", getTodos)
router.get("/todos/:id", getTodo)
router.post("/", createTodo)
router.put("/update/:id", updateTodo)
router.delete("/delete/:id", deleteTodo)

export default router