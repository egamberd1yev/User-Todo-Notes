import * as todoService from "../services/todo.service.js";

export const getTodos = async (req, res, next) => {
	try {
		const userId = req.user.id
		const todos = await todoService.getTodos(userId);
		res.json(todos);
	} catch (error) {
		next(error);
	}
};

export const getTodo = async (req, res, next) => {
	try {
		const todo = await todoService.getTodo(Number(req.params.id));
		res.json(todo);
	} catch (error) {
		next(error);
	}
};

export const createTodo = async (req, res, next) => {
	try {
		const userId = req.user.id
		const todo = await todoService.createTodo(userId, req.body);
		res.status(201).json(todo);
	} catch (error) {
		next(error);
	}
};

export const updateTodo = async (req, res, next) => {
	try {
		const todo = await todoService.updateTodo(Number(req.params.id), req.body);
		res.json(todo);
	} catch (error) {
		next(error);
	}
};

export const deleteTodo = async (req, res, next) =>  {
	try {
		const todo = await todoService.deleteTodo(Number(req.params.id));
		res.json({
			message: "Todo deleted",
			todo,
		});
	} catch (error) {
		next(error);
	}
};