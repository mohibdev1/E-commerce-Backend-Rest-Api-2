const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    phone: Joi.string()
        .min(10)
        .max(15)
        .required()
});
const productSchema = Joi.object({
    title: Joi.string()
        .required(),

    description: Joi.string()
        .required(),

    price: Joi.number()
        .min(0)
        .required(),

    category: Joi.string()
        .required(),

    stock: Joi.number()
        .min(0)
        .required(),

    image: Joi.string()
        .allow("")
});

module.exports = {
    registerSchema,
    productSchema
};