import { AppDataSource } from "../config/data-source.js";
import { TodoEntity } from "../models/todo.entity.js";

// Bitta repository instansiyasi, butun ilova bo'yicha ulashiladi.
const todoRepo = AppDataSource.getRepository(TodoEntity);

export const findAllTodos = async () => {
  return todoRepo.find({ order: { id: "DESC" } });
};

export const findTodoById = async (id) => {
  return todoRepo.findOneBy({ id });
}; 

export const createTodo = async ({ title, desc }) => {
  const todo = todoRepo.create({ title,  desc});
  return todoRepo.save(todo); // INSERT ... RETURNING *
};

export const deleteTodoById = async (id) => {
  const todo = await todoRepo.findOneBy({ id });
  if (!todo) return null;
  await todoRepo.remove(todo); // DELETE ... va o'chirilgan qatorni qaytaradi
  return todo;
};