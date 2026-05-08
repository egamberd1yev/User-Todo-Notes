import jwt from "jsonwebtoken"
import { UserAppDataSource } from '../config/user-data-source.js';
import { UserEntity } from '../models/user.entity.js';

export const protect = async (req, res, next) => {
  try {
    // 1. Header tekshirish
    const header = req.headers.authorization

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" })
    }

    // 2. Token olish
    const token = header.split(" ")[1]

    // 3. Token tekshirish
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 4. Userni DB dan olish — password ni chiqarmaslik
    const userRepo = UserAppDataSource.getRepository(UserEntity);
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
        // password: false — bu yerda yozmaslik kifoya
      }
    })

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    // 5. req.user ga saqlash
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