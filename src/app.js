// import express from "express"
// import dotenv from "dotenv"
// import { pool } from "./config/db.js";
// import userRoutes from "./routes/user.routes.js"
// // import todoRoutes from "./routes/todo.routes.js" 
// import notesRoute from "./routes/note.routes.js"
// import adminRoutes from "./routes/admin.routes.js"

// dotenv.config()

// const app = express()
// app.use(express.json())


// app.use("/api/user", userRoutes)
// app.use("/api/notes", notesRoute)
// app.use("/api/admin", adminRoutes)
// app.use("/uploads", express.static("uploads"))

// app.use((err, _req, res, _next) => {
// 	const statusCode = err.statusCode || 500
// 	res.status(statusCode).json({
// 		error: err.message || "Internal server error"
// 	})
// })

// const result = await pool.query("SELECT NOW() as now");
// if (result)
  // 	console.log("Postgress Connected");
    

  // const PORT = process.env.PORT || 3000


  //   app.listen(PORT, () => {
  //     console.log(`Server running on port ${PORT}`)
  //   }

import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.routes.js";
import userRotes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { AppDataSource } from "./config/data-source.js";
import { UserAppDataSource } from "./config/user-data-source.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/todos", todoRoutes);
app.use("/user", userRotes);
app.use("/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Postgres TypeORM orqali ulandi");
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portda ishlamoqda`);
    });
  })
  .catch((err) => {
    console.error("DB ulanishda xato ❌", err);
    process.exit(1); 
  });


  UserAppDataSource.initialize()
  .then(() => {
    console.log("Postgres TypeORM orqali ulandi");
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portda ishlamoqda`);
    });
  })
  .catch((err) => {
    console.error("DB ulanishda xato ❌", err);
    process.exit(1); 
  });

const PORT = process.env.PORT || 3000;