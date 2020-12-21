const joi = require('joi');

const PostSchema = joi.object({
  text_content: joi.string()
    .alphanum(),
  image_content: joi.string()
    .alphanum(),
  time_post: joi.date()
    .timestamp()
    .greater('now'),

})

module.exports = { PostSchema };