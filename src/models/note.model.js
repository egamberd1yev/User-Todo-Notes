import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: { type: String, required: true },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }
}, { timestamps: true });

export default model("Note", noteSchema);