import * as adminRepository from "../repositories/admin.repositories.js"

export const getAllUsers = async () => {
  return adminRepository.findAllUsers()
}

export const deleteUser = async (userId) => {
  return adminRepository.deleteUser(userId)
}

export const getAllNotes = async () => {
  return adminRepository.findAllNotes()
}

export const deleteNote = async (noteId) => {
  return adminRepository.deleteNote(noteId)
}

export const getAllTodos = async () => {
  return adminRepository.findAllTodos()
}

export const deleteTodo = async (todoId) => {
  return adminRepository.deleteTodo(todoId)
}

export const createTodo = async (userId, todoData) => {
  return adminRepository.createTodo(userId, todoData)
}

export const updateTodo = async (todoId, todoData) => {
  return adminRepository.updateTodo(todoId, todoData)
}