import { UserAppDataSource } from '../config/user-data-source.js';
import { UserEntity } from '../models/user.entity.js';

const userRepo = () => UserAppDataSource.getRepository(UserEntity);

// ✅ Barcha userlar (filter + pagination)
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

// ✅ ID orqali topish
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

// ✅ Email orqali topish
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

// ✅ Username orqali topish (agar entity da bo'lsa)
export const findUserByUserName = async (userName) => {
  return userRepo().findOne({
    where: { userName },
  });
}

// ✅ User yaratish
export const createUser = async (data) => {
  const user = userRepo().create(data);
  return userRepo().save(user);
}

// ✅ ID orqali o'chirish
export const deleteUserById = async (id) => {
  const user = await userRepo().findOne({ where: { id } });

  if (!user) return null;

  await userRepo().delete(id);
  return user;
}