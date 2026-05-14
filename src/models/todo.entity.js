import { EntitySchema } from "typeorm";

export const TodoEntity = new EntitySchema({
  name: "Todo",
  tableName: "todos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true, // avtomatik o'suvchi PK
    },
    title: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    desc: {
      type: "varchar",
      length: 150,
      unique: true,
      nullable: false,
    },
    isCompleted: {
      type: "int",
      nullable: true,
    },
    // userImage: {
    //   type: "varchar",
    //   nullable: true,
    // },
    // password: {
    //   type: "varchar",
    //   nullable: false,
    // },
    // role: {
    //   type: "varchar",
    //   length: 20,
    //   default: "user",
    // },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
});