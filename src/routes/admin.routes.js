import { Router } from "express"
import * as adminController from "../controllers/admin.controller.js"
import { protect } from "../middlewares/auth.middleware.js"
import { requireAdmin } from "../middlewares/admin.middleware.js"

const router = Router()

router.use(protect, requireAdmin)

router.get("/users", adminController.getAllUsers)
router.delete("/users/:id", adminController.deleteUser)

router.get("/notes", adminController.getAllNotes)
router.delete("/notes/:id", adminController.deleteNote)

router.get("/todos", adminController.getAllTodos)
router.post("/todos", adminController.createTodo)
router.put("/todos/:id", adminController.updateTodo)
router.delete("/todos/:id", adminController.deleteTodo)

export default router