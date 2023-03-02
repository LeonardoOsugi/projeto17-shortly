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
});

export const shortSchema = joi.object({
    url: joi.string().regex(/^(http|https):\/\/[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/).required(),
    shotUrl: joi.string().required()
})

