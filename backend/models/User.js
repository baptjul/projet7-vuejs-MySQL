const joi = require('joi');

const UserSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(3)
        .max(50),
    profile_picture: joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .allow(null, ''),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
    firstname: joi.string()
        .min(3)
        .max(255)
        .allow(null, ''),
    lastname: joi.string()
        .min(3)
        .max(255)
        .allow(null, ''),
    description: joi.string()
        .alphanum()
        .allow(null, ''),
    birthday: joi.date()
        .min('1-1-1900')
        .max('12-31-2020')
        .allow(null)
}).unknown();

module.exports = { UserSchema }