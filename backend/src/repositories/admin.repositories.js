import { AppDataSource } from "../config/data-source.js"
import { UserEntity } from "../models/user.entity.js"
import { TodoEntity } from "../models/todo.entity.js"
import { deleteTodosByUserId } from './todo.repositories.js';

const userRepo = () => AppDataSource.getRepository(UserEntity)
const todoRepo = () => AppDataSource.getRepository(TodoEntity)

export const findAllUsers = async () => {
  return userRepo().find({
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      userImage: true,
      role: true,
      createdAt: true
    }
  });
}

export const deleteUser = async (userId) => {
  const user = await userRepo().findOne({ where: { id: Number(userId) } });
  if (!user) return null;

  // 1: Avval todolarni o'chir
  await deleteTodosByUserId(userId);

  // 2: Keyin userni o'chir
  await userRepo().delete(Number(userId));

  return user;
};




// export const findAllNotes = async () => {
//   return Note.find().populate("userId", "email username")
// }

// export const deleteNote = async (noteId) => {
//   return Note.findByIdAndDelete(noteId)
// }


export const findAllTodos = async () => {
  return todoRepo().find({
    relations: ["user"],
    select: {
      id: true,
      title: true,
      isCompleted: true,
      createdAt: true,
      user: {
        id: true,
        email: true,
        name: true
      }
    }
  });
}

export const deleteTodo = async (todoId) => {
  const todo = await todoRepo().findOne({ where: { id: Number(todoId) } });
  if (!todo) return null;
  await todoRepo().delete(Number(todoId))
  return todo
}

export const createTodo = async (userId, todoData) => {
  const user = await userRepo().findOne({ where: {id: Number(userId)} });
  if (!user) return null;

  const todo = todoRepo().create({ ...todoData, user });
  return todoRepo().save(todo)
}

export const updateTodo = async (todoId, todoData) => {
  await todoRepo().update(Number(todoId), todoData);
  return todoRepo().findOne({ where: { id: Number(todoId) } })
}