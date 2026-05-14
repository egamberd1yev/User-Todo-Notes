import * as todoRepository from "../repositories/todo.repositories.js";

export const getTodos = async () => {
	return todoRepository.findAllTodos();
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

export const createTodo = async (data) => {
	const { title, desc, is_completed } = data;
	if (!title) {
		const error = new Error("Title is required");
		error.statusCode = 400;
		throw error;
	}
	return todoRepository.createTodo({ title, desc, is_completed });
};

export const updateTodo = async (id, data) => {
	const todo = await todoRepository.findTodoById(id);
	if (!todo) {
		const error = new Error("Todo not found");
		error.statusCode = 404;
		throw error;
	}
	const { title = todo.title, description = todo.description, is_completed = todo.is_completed } = data;
	return todoRepository.updateTodoById(id, { title, description, is_completed });
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