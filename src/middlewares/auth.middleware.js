import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protect = async (req, res, next) => {
	try {
		const header = req.headers.authorization

		if (!header || !header.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Not authorized" })
		}

		const token = header.split(" ")[1]

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const user = await User.findById(decoded.id).select("-password")

		if (!user) {
			return res.status(401).json({ message: "User not found" })
		}

		req.user = user
		next()
	} catch (error) {
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ message: "Token noto‘g‘ri" })
		}
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ message: "Token muddati tugagan" })
		}
		return res.status(500).json({ message: "Server error" })
	}
}