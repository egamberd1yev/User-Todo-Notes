import * as userRepository from "../repositories/user.repositories.js"
import { UserAppDataSource } from '../config/user-data-source.js';
import { UserEntity } from '../models/user.entity.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userRepo = () => UserAppDataSource.getRepository(UserEntity);

export const getUsers = async (query) => {
  const filters = {}

  if (query.age) filters.age = query.age
  if (query.name) filters.name = query.name

  const page = parseInt(query.page, 10) || 1
  const limit = parseInt(query.limit, 10) || 10

  return userRepository.findUsers(filters, page, limit)
}

export const getUserById = async (id) => {
  const user = await userRepository.findUserById(id)

  if (!user) {
    const error = new Error("User not found")
    error.statusCode = 404
    throw error
  }

  return user
}

export const deleteUser = async (id) => {
  const user = await userRepo().findOne({ where: { id } })

  if (!user) {
    const error = new Error("User not found")
    error.statusCode = 404
    throw error
  }

  await userRepo().delete(id)
  return { message: "User deleted" }
}

export const register = async (data) => {
  const { name, email, password } = data

  const existingUser = await userRepo().findOne({
    where: { email: email.toLowerCase() }
  })
  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = userRepo().create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  })
  await userRepo().save(user)

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  const { password: _, ...userWithoutPassword } = user

  return { user: userWithoutPassword, token }
}

export const login = async ({ email, password }) => {
  const user = await userRepo().findOne({
    where: { email: email.toLowerCase() },
    select: { id: true, email: true, password: true, role: true, name: true }
  })

  if (!user) throw new Error("Invalid credentials")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid credentials")

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  const { password: _, ...userWithoutPassword } = user

  return { user: userWithoutPassword, token }
}

export const getProfile = async (userId) => {
  const user = await userRepo().findOne({ where: { id: userId } })
  if (!user) throw new Error("User not found")

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}