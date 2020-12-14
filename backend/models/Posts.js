const joi = require('joi');

const PostSchema = joi.object({
  text_content: joi.string()
    .alphanum(),
  time_post: joi.date()
    .min('12-12-2020'),
  username: joi.string()
    .alphanum()
    .min(3)
    .max(50),
})

module.exports = { PostSchema };