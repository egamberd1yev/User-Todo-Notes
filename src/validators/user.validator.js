import Joi from "joi";

export const registerSchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
	age: Joi.number().min(0).max(120).optional(),
})

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
})



// export const createUserSchema = Joi.object({
// 	name: Joi.string().min(2).max(50).required(),
// 	email: Joi.string().email().required(),
// 	userName: Joi.string().min(3).max(30).required(),
// 	password: Joi.string().min(6).required(),
// 	phoneNumber: Joi.string().pattern(/^\+998\d{9}$/).required(),
// 	age: Joi.number().min(0).max(120).optional(),
// 	userImage: Joi.string().optional(),
// });