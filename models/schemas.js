import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(11).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
    password: joi.string().min(4).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
});

export const signinSchema = joi.object({
    email: joi.string().min(11).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
    password: joi.string().min(4).required()
})

