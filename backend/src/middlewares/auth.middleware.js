import jwt from "jsonwebtoken"
import { AppDataSource } from '../config/data-source.js';
import { UserEntity } from '../models/user.entity.js';

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const token = header.split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const userRepo = AppDataSource.getRepository(UserEntity);
    const user = await userRepo.findOne({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        userImage: true,
        role: true,
        createdAt: true,
      }
    })

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }
    req.user = user
    next()

  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token noto'g'ri" })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token muddati tugagan" })
    }
    return res.status(500).json({ message: "Server error" })
  }
}