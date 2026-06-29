import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { TodoEntity } from "../models/todo.entity.js";
import { UserEntity } from "../models/user.entity.js";
dotenv.config();

const isProduction = !!process.env.DATABASE_URL;

export const AppDataSource = new DataSource(
  isProduction
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        synchronize: true,
        logging: false,
        entities: [TodoEntity, UserEntity],
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: false,
        synchronize: true,
        logging: true,
        entities: [TodoEntity, UserEntity],
      }
);