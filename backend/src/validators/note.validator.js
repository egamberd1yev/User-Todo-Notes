import Joi from "joi";

export const createNoteSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  userId: Joi.string().required()
});