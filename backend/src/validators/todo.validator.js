import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  desc: Joi.string().min(2).max(200).required(),
  is_completed: Joi.boolean().optional().required()
  // userId: Joi.string().required()
});
