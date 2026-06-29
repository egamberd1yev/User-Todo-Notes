import { AppDataSource } from '../config/data-source.js';  // ✅ fixed name
import { UserEntity } from '../models/user.entity.js';

const userRepo = () => AppDataSource.getRepository(UserEntity);  // ✅ fixed name

export const findUsers = async (filters = {}, page = 1, limit = 10) => {
  const skip = (Number(page) - 1) * Number(limit);  // ✅ force numbers

  return userRepo().find({
    where: filters,
    skip,
    take: Number(limit),  // ✅ force number
    select: { id: true, name: true, email: true, age: true, userImage: true, role: true, createdAt: true }
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
      telegramChatId: true,
    }
  });
}


export const findUserByEmail = async (email) => {
  return userRepo().findOne({
    where: { email },
    select: { id: true, name: true, email: true, password: true, role: true }
  });
}

export const findUserByUserName = async (userName) => {
  return userRepo().findOne({ where: { userName } });
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

export const findUserByTelegramChatId = async (telegramChatId) => {
  return userRepo().findOneBy({ telegramChatId: String(telegramChatId) });  // ✅ fixed
};

export const findAllUserChatId = async () => {
  return userRepo().find({ order: { telegramChatId: "DESC" } });  // ✅ fixed
}

export const createUserFromBot = async ({ name, email, telegramChatId }) => {
  const user = userRepo().create({  // ✅ fixed
    name,
    email,
    telegramChatId: String(telegramChatId),
    password: "telegram-user",
    role: "user",
  });
  return userRepo().save(user);  // ✅ fixed
};