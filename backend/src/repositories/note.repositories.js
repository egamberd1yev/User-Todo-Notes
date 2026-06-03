import Note from "../models/note.model.js";

export const findNotes = async (filters, page, limit) => {
  const skip = (page - 1) * limit
  return Note.find(filters).skip(skip).limit(limit)
}

export const findNoteById = async (id) => {
  return Note.findById(id)
}

export const createNote = async (userId, data) => {

  const newNote = new Note({
    userId: userId,
    ...data
  })
  return await newNote.save()
}

export const updateNoteById = async (id, data) => {
  const updatedNote = await Note.findByIdAndUpdate(
    id,
    data,
    { new: true }
  )

  return updatedNote
}

export const deleteNoteById = async (id) => {
  return Note.findByIdAndDelete(id)
}