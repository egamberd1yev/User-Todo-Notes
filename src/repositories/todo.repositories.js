import { AppDataSource } from "../config/data-source.js";
import { TodoEntity } from "../models/todo.entity.js";

const todoRepo = () => AppDataSource.getRepository(TodoEntity);

export const findAllTodos = async (userId) => {
  return todoRepo.find({ 
  where: { user: { id: userId } },
  order: { id: "DESC" } 
});
};

export const findTodoById = async (id) => {
  return todoRepo.findOneBy({ id });
}; 

export const createTodo = async (userId, { title, desc }) => {
  const todo = todoRepo.create({
     title,
     desc,
     user: { id: userId }
  });
  return todoRepo.save(todo); 
};

export const deleteTodoById = async (id) => {
  const todo = await todoRepo.findOneBy({ id });
  if (!todo) return null;
  await todoRepo.remove(todo);
  return todo;
};