import * as noteService from "../services/note.service.js"

export const getNotes = async (req, res, next) => {
  try {
    const notes = await noteService.getNotes(req.query)
    res.json(notes)
  } catch (error) {
    next(error)
  }
}

export const getNoteById = async (req, res, next) => {
  try {
    const note = await noteService.getNoteById(req.params.id)
    res.json(note)
  } catch (error) {
    next(error)
  }
}

export const createNote = async (req, res, next) => {
  try {
    const note = await noteService.createNote(req.body.userId, req.body)
    res.status(201).json(note)
  } catch (error) {
    next(error)
  }
}

export const updateNote = async (req, res, next) => {
  try {
    const updatedNote = await noteService.updateNote(
      req.params.id,
      req.body
    )
    res.json(updatedNote)
  } catch (error) {
    next(error)
  }
}

export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await noteService.deleteNote(req.params.id)

    res.json({
      message: "Note deleted",
      note: deletedNote,
    })
  } catch (error) {
    next(error)
  }
}