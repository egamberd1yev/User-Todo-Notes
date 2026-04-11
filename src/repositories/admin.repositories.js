import User from "../models/user.model.js"
import Note from "../models/note.model.js"
import Todo from "../models/todo.model.js"

export const findAllUsers = async () => {
  return User.find().select("-password")
}

export const deleteUser = async (userId) => {
  return User.findByIdAndDelete(userId)
}


export const findAllNotes = async () => {
  return Note.find().populate("userId", "email username")
}

export const deleteNote = async (noteId) => {
  return Note.findByIdAndDelete(noteId)
}


export const findAllTodos = async () => {
  return Todo.find().populate("userId", "email username")
}

export const deleteTodo = async (todoId) => {
  return Todo.findByIdAndDelete(todoId)
}

export const createTodo = async (userId, todoData) => {
  const todo = new Todo({ ...todoData, userId })
  return todo.save()
}

export const updateTodo = async (todoId, todoData) => {
  return Todo.findByIdAndUpdate(
    todoId,
    todoData,
    { new: true }   
  )
}