const joi = require('joi');

const UserSchema = joi.object({
    username: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,50}$'))
        .alphanum()
        .min(3)
        .max(50),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
    firstname: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,255}$'))
        .min(3)
        .max(255)
        .allow(null, ''),
    lastname: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,255}$'))
        .min(3)
        .max(255)
        .allow(null, ''),
    position: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,255}$'))
        .min(3)
        .max(255)
        .allow(null, ''),
    description: joi.string()
        .allow(null, ''),
    birthday: joi.date()
        .min('1-1-1900')
        .max('12-31-2020')
        .allow(null)
}).unknown();

module.exports = { UserSchema }