const joi = require('joi');

const CommentSchema = joi.object({
    content: joi.string(),
    time: joi.string(),
    idposts: joi.number(),
    iduser: joi.number()
})

module.exports = { CommentSchema };