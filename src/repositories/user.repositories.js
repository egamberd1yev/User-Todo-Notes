import { UserAppDataSource } from '../config/user-data-source.js';
import { UserEntity } from '../models/user.entity.js';

const userRepo = () => UserAppDataSource.getRepository(UserEntity);


export const findUsers = async (filters, page, limit) => {
  const skip = (page - 1) * limit;

  return userRepo().find({
    where: filters,
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      userImage: true,
      role: true,
      createdAt: true,
    }
  });
}


export const findUserById = async (id) => {
  return userRepo().findOne({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      userImage: true,
      role: true,
      createdAt: true,
    }
  });
}


export const findUserByEmail = async (email) => {
  return userRepo().findOne({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true, // login uchun kerak
      role: true,
    }
  });
}

export const findUserByUserName = async (userName) => {
  return userRepo().findOne({
    where: { userName },
  });
}

export const createUser = async (data) => {
  const user = userRepo().create(data);
  return userRepo().save(user);
}

export const deleteUserById = async (id) => {
  const user = await userRepo().findOne({ where: { id } });

  if (!user) return null;

  await userRepo().delete(id);
  return user;
}