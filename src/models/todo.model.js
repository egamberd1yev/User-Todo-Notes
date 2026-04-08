import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }
}, { timestamps: true });

export default model("Todo", todoSchema);