const joi = require('joi');

const CommentSchema = joi.object({
    content: joi.string()
        .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/),
    time: joi.string(),
    idposts: joi.number(),
    iduser: joi.number()
})

module.exports = { CommentSchema };