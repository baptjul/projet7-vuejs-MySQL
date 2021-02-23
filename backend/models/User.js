const joi = require('joi');

const UserSchema = joi.object({
    username: joi.string()
        .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
        .alphanum()
        .min(3)
        .max(50),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
    firstname: joi.string()
        .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
        .min(3)
        .max(255)
        .allow(null, ''),
    lastname: joi.string()
        .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
        .min(3)
        .max(255)
        .allow(null, ''),
    position: joi.string()
        .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
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