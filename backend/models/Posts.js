const joi = require('joi');

const PostSchema = joi.object({
  post: joi.string()
    .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/),
  postPicture: joi.string()
    .alphanum(),
  iduser: joi.number()
})

module.exports = { PostSchema };