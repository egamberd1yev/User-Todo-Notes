import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { TodoEntity } from "../models/todo.entity.js";
import { UserEntity } from "../models/user.entity.js";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: true,
  logging: false,
  entities: [TodoEntity, UserEntity],
});