import {  Router } from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/note.controller.js";

const router = Router()

router.get("/", getNotes)
router.get("/notes/:id", getNoteById)
router.post("/user/:userId", createNote)
router.put("/notes/:id", updateNote)
router.delete("/notes/:id", deleteNote)

export default router