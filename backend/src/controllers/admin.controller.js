import * as adminService from "../services/admin.service.js"

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await adminService.deleteUser(req.params.id)
    res.json({
      message: "User deleted",
      user: deletedUser,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await adminService.getAllNotes()
    res.json(notes)
  } catch (error) {
    next(error)
  }
}

export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await adminService.deleteNote(req.params.id)
    res.json({
      message: "Note deleted",
      note: deletedNote,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await adminService.getAllTodos()
    res.json(todos)
  } catch (error) {
    next(error)
  }
}

export const deleteTodo = async (req, res, next) => {
  try {
    const deletedTodo = await adminService.deleteTodo(req.params.id)
    res.json({
      message: "Todo deleted",
      todo: deletedTodo,
    })
  } catch (error) {
    next(error)
  }
}

export const createTodo = async (req, res, next) => {
  try {
    const { userId, ...todoData } = req.body 
    const todo = await adminService.createTodo(userId, todoData)
    res.status(201).json(todo)
  } catch (error) {
    next(error)
  }
}

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await adminService.updateTodo(req.params.id, req.body)
    res.json(todo)
  } catch (error) {
    next(error)
  }
}

