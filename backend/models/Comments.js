const joi = require('joi');

const CommentSchema = joi.object({
    content: joi.string()
        .alphanum(),
    time_comment: joi.date()
        .min('12-12-2020'),
    username: joi.string()
        .alphanum()
        .min(3)
        .max(50),
})

module.exports = { CommentSchema };