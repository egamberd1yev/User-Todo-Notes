import { Router } from "express"
import {
getUsers,
getUser,
deleteUser,
uploadUserImage,
getProfile,
register,
login
} from "../controllers/user.controller.js"

import { upload } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { protect } from "../middlewares/auth.middleware.js"
import { registerSchema, loginSchema } from "../validators/user.validator.js"

const router = Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.get("/me", protect, getProfile)

router.get("/", getUsers)
router.post("/upload", upload.single("image"), uploadUserImage)
router.get("/:id", getUser)
router.delete("/:id", deleteUser)

export default router