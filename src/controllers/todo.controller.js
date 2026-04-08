import * as todoService from "../services/todo.service.js"

export const getUserTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getTodosByUserId(
      req.params.userId,
      req.query
    )
    res.json(todos)
  } catch (error) {
    next(error)
  }
}

export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await todoService.getTodos(req.query)
    res.json(todos)
  } catch (error) {
    next(error)
  }
}

export const getTodoById = async (req, res, next) => {
  try {
    const todo = await todoService.getTodoById(req.params.id)
    res.json(todo)
  } catch (error) {
    next(error)
  }
}

export const createTodo = async (req, res, next) => {
  try {
    const todo = await todoService.createTodo(req.body)

    res.status(201).json(todo)
  } catch (error) {
    next(error)
  }
}

export const updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await todoService.updateTodo(
      req.params.id,
      req.body
    )

    res.json(updatedTodo)
  } catch (error) {
    next(error)
  }
}

export const deleteTodo = async (req, res, next) => {
  try {
    const deletedTodo = await todoService.deleteTodo(req.params.id)

    res.json({
      message: "Todo deleted",
      todo: deletedTodo
    })
  } catch (error) {
    next(error)
  }
}
