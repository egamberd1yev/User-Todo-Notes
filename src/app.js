import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import userRoutes from "./routes/user.routes.js"
import todoRoutes from "./routes/todo.routes.js" 
import notesRoute from "./routes/note.routes.js"
import adminRoutes from "./routes/admin.routes.js"

dotenv.config()

const app = express()

app.use(express.json())


app.use("/api/user", userRoutes)
app.use("/api/todos", todoRoutes) 
app.use("/api/notes", notesRoute)
app.use("/api/admin", adminRoutes)
app.use("/uploads", express.static("uploads"))

app.use((err, _req, res, _next) => {
	const statusCode = err.statusCode || 500
	res.status(statusCode).json({
		error: err.message || "Internal server error"
	})
})


const PORT = process.env.PORT || 3000

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()