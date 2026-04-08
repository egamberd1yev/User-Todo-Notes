import Todo from "../models/todo.model.js"

export const findTodosByUserId = async (userId, query) => {
  const filter = { userId }

  if (query?.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } }
    ]
  }

  return Todo.find(filter)
}

export const findTodos = async (filters, page, limit) => {
	const skip = (page - 1) * limit

	return Todo.find(filters).skip(skip).limit(limit)
}

export const findTodoById = async (id) => {
  return Todo.findById(id)
}

export const create = async (userId, data) => {

  const newTodo = new Todo({
    userId: userId,
    ...data
  })

  return newTodo.save()
}
export const updateTodoById = async (id, data) => {
  return Todo.findByIdAndUpdate(id, data, { new: true })
}

export const deleteTodoById = async (id) => {
  return Todo.findByIdAndDelete(id)
}