import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  description: Joi.string().min(2).max(200).required(),
  completed: Joi.boolean().optional(),
  userId: Joi.string().required()
});
