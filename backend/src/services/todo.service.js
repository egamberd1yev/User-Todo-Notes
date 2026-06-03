import * as todoRepository from "../repositories/todo.repositories.js";
import { AppDataSource } from "../config/data-source.js";
import { TodoEntity } from "../models/todo.entity.js";

const todoRepo = () => AppDataSource.getRepository(TodoEntity);

export const getTodos = async (userId) => {
	return await todoRepo().find({
		where: { user: {id: userId} }
	})
};

export const getTodo = async (id) => {
	const todo = await todoRepository.findTodoById(id);
	if (!todo) {
		const error = new Error("Todo not found");
		error.statusCode = 404;
		throw error;
	}
	return todo;
};

export const createTodo = async (userId, data) => {
	const { title, desc, is_completed } = data;
	const todo = todoRepo().create({
		title,
		desc,
		is_completed: is_completed ?? 0,
		user: { id: userId },
	})

	if (!title) {
		const error = new Error("Title is required");
		error.statusCode = 400;
		throw error;
	}
	return await todoRepo().save(todo)
};

export const updateTodo = async (id, data) => {
  const todo = await todoRepository.findTodoById(id);
  if (!todo) {
    const error = new Error("Todo not found");
    error.statusCode = 404;
    throw error;
  }

  // "description" → "desc", "is_completed" → "isCompleted"
  const { title = todo.title, desc = todo.desc, isCompleted = todo.isCompleted } = data;
  
  return todoRepository.updateTodoById(id, { title, desc, isCompleted });
};

export const deleteTodo = async (id) => {
	const deletedTodo = await todoRepository.deleteTodoById(id);
	if (!deletedTodo) {
		const error = new Error("Todo not found");
		error.statusCode = 404;
		throw error;
	}
	return deletedTodo;
};