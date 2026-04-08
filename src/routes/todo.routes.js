import { Router } from "express"
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js"
import { validate } from "../middlewares/validate.middleware.js";
import { createTodoSchema } from "../validators/todo.validator.js";

const router = Router()

router.get("/", getAllTodos)
router.get("/todos/:id", getTodoById)
router.post("/user/:userId", validate(createTodoSchema), createTodo)
router.put("/update/:id", updateTodo)
router.delete("/delete/:id", deleteTodo)

export default router