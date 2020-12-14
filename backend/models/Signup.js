const joi = require('joi');

const SignupSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(3)
        .max(50),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required()
})

module.exports = { SignupSchema }