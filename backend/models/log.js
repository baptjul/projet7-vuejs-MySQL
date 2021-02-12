const joi = require('joi');

const LogSchema = joi.object({
    username: joi.string()
        .alphanum()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,15}$'))
        .min(3)
        .max(15),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{7,20}$'))
        .required()
}).unknown();

module.exports = { LogSchema }