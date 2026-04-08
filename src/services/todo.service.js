import * as todoRepository from "../repositories/todo.repositories.js"

export const getTodosByUser = async (userId) => {
  return todoRepository.findTodosByUserId(userId)
}

export const getTodoById = async (id) => {
  const todo = await todoRepository.findTodoById(id)

  if (!todo) {
    const error = new Error("Todo not found")
    error.statusCode = 404
    throw error
  }

  return todo
}


export const getTodos = async (query) => {
  const filters = {}

  if (query.title) {
    filters.title = query.title
  }

  if (query.description) {
    filters.description = query.description
  }

  const page = parseInt(query.page, 10) || 1
  const limit = parseInt(query.limit, 10) || 10

  return todoRepository.findTodos(filters, page, limit)
}

export const createTodo = async (data) => {

  const { title, description, completed, userId } = data

  if (!title) {
    const error = new Error("Title is required")
    error.statusCode = 400
    throw error
  }

  return todoRepository.create(userId, {
    title,
    description,
    completed
  })
}

export const updateTodo = async (id, data) => {
  const updatedTodo = await todoRepository.updateTodoById(id, data)

  if (!updatedTodo) {
    const error = new Error("Todo not found")
    error.statusCode = 404
    throw error
  }

  return updatedTodo
}

export const deleteTodo = async (id) => {
  const deletedTodo = await todoRepository.deleteTodoById(id)

  if (!deletedTodo) {
    const error = new Error("Todo not found")
    error.statusCode = 404
    throw error
  }

  return deletedTodo
}