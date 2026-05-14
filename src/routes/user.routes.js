import { Router } from "express"
import {
  getUsers,
  getUser,
  deleteUser,
  uploadUserImage,
  getProfile,
  register,
  login,
  refresh
} from "../controllers/user.controller.js"

import { upload } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { protect } from "../middlewares/auth.middleware.js"
import { registerSchema, loginSchema } from "../validators/user.validator.js"

const router = Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/refresh", refresh)

router.get("/me", protect, getProfile)
router.post("/upload", protect, upload.single("image"), uploadUserImage)


router.get("/", protect, getUsers)
router.get("/:id", protect, getUser)
router.delete("/:id", protect, deleteUser)

export default router