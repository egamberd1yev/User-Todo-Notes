import { AppDataSource } from "../config/data-source.js";
import { TodoEntity } from "../models/todo.entity.js";

const todoRepo = () => AppDataSource.getRepository(TodoEntity); // ← bu to'g'ri

export const findAllTodos = async (userId) => {
  return todoRepo().find({ // ← () qo'shildi
    where: { user: { id: userId } },
    order: { id: "DESC" }
  });
};

export const findTodoById = async (id) => {
  return todoRepo().findOneBy({ id }); // ← () qo'shildi
};

export const createTodo = async (userId, { title, desc }) => {
  const todo = todoRepo().create({ // ← () qo'shildi
    title,
    desc,
    user: { id: userId }
  });
  return todoRepo().save(todo); // ← () qo'shildi
};

export const deleteTodoById = async (id) => {
  const todo = await todoRepo().findOneBy({ id }); // ← () qo'shildi
  if (!todo) return null;
  await todoRepo().remove(todo);
  return todo;
};

export const updateTodoById = async (id, data) => {
  await todoRepo().update(id, data);
  return todoRepo().findOneBy({ id });
};

// Admin uchun userId bo'yicha o'chirish — YANGI FUNKSIYA
export const deleteTodosByUserId = async (userId) => {
  return todoRepo()
    .createQueryBuilder()
    .delete()
    .from(TodoEntity)
    .where("userId = :userId", { userId: Number(userId) })
    .execute();
};
