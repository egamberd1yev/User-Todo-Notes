import { EntitySchema } from "typeorm";

export const TodoEntity = new EntitySchema({
  name: "Todo",
  tableName: "todos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
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
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },

  relations: {
    user: {                          
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "userId" },
      nullable: false,
    }
  }
});