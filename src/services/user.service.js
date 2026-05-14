import * as userRepository from "../repositories/user.repositories.js"
import { AppDataSource } from '../config/data-source.js';
import { UserEntity } from '../models/user.entity.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userRepo = () => AppDataSource.getRepository(UserEntity);

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
  const { name, email, password, role } = data

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
    role: role || 'user'
  })
  await userRepo().save(user)

  const accesToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  const { password: _, ...userWithoutPassword } = user
  return { user: userWithoutPassword, accesToken, refreshToken }
}

export const login = async ({ email, password }) => {
  const user = await userRepo().findOne({
    where: { email: email.toLowerCase() },
    select: { id: true, email: true, password: true, role: true, name: true }
  })

  if (!user) throw new Error("Invalid credentials")

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error("Invalid credentials")

  const accesToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  await userRepo().update(user.id, { refreshToken })

  const { password: _, ...userWithoutPassword } = user
  return { user: userWithoutPassword, accesToken, refreshToken }
}

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Refresh token yo'q")
    error.statusCode = 401
    throw error
  }

  const user = await userRepo().findOne({ where: { refreshToken }})
  if(!user) {
    const error = new Error("Token noto'g'ri")
    error.statusCode = 403
    throw error
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const newAccessToken = generateAccessToken(decoded)
    return { accesToken: newAccessToken }
  } catch (err) {
    const error = new Error("Token eskirgan yoki noto'g'ri")
    error.statusCode = 403
    throw error
  }
}

export const getProfile = async (userId) => {
  const user = await userRepo().findOne({ where: { id: userId } })
  if (!user) throw new Error("User not found")

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  )
}

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  )
}