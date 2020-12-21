const joi = require('joi');

const CommentSchema = joi.object({
    content: joi.string()
        .alphanum(),
    time_comment: joi.date()
        .timestamp()
        .greater('now'),
})

module.exports = { CommentSchema };