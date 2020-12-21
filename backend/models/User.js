const joi = require('joi');

const UserSchema = joi.object({
    username: joi.string()
        .alphanum()
        .min(3)
        .max(50),
    profile_picture: joi.string()
        .alphanum()
        .min(3)
        .max(50),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    access_token: [
        joi.string(),
        joi.number()
    ],
    firstname: joi.string()
        .min(3)
        .max(255),
    lastname: joi.string()
        .min(3)
        .max(255),
    description: joi.string()
        .alphanum(),
    birthday: joi.date()
        .min('1-1-1900')
        .max('12-31-2020'),
    creation_date: joi.date()
        .min('12-12-2020'),
    admin: joi.number()
})

module.exports = { UserSchema }