import Joi from "joi";

export const registerSchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
	email: Joi.string().email().required(),
	role: Joi.string().valid("user", "admin").default("user"),
	password: Joi.string().min(6).required(),
	age: Joi.number().min(0).max(120).optional(),
})

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	role: Joi.string().valid("user", "admin").default("user")
})