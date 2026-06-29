import * as noteRepository from "../repositories/note.repositories.js"

export const getNotes = async (query) => {
  const filters = {}

  if (query.title) {
    filters.title = query.title
  }

  if (query.userId) {
    filters.userId = query.userId
  }

  const page = parseInt(query.page, 10) || 1
  const limit = parseInt(query.limit, 10) || 10

  return noteRepository.findNotes(filters, page, limit)
}


export const getNoteById = async (id) => {
  const note = await noteRepository.findNoteById(id)

  if (!note) {
    const error = new Error("Note not found")
    error.statusCode = 404
    throw error
  }

  return note
}

export const createNote = async (userId, data) => {
  const { title } = data

  if (!title) {
    const error = new Error("Title is required")
    error.statusCode = 400
    throw error
  }

  return noteRepository.createNote(userId, data)

}

export const updateNote = async (id, data) => {
  const updatedNote = await noteRepository.updateNoteById(id, data)
  
  if (!updatedNote) {
    const error = new Error("Note not found")
    error.statusCode = 404
    throw error
  }
  return updatedNote
}

export const deleteNote = async (id) => {
  const deletedNote = await noteRepository.deleteNoteById(id)
  if (!deletedNote) {
    const error = new Error("Note not found")
    error.statusCode = 404
    throw error
  }
  return deletedNote
}