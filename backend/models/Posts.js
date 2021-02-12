const joi = require('joi');

const PostSchema = joi.object({
  post: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9_.,!?:-]{3,15}$$')).allow(null, ''),
  postPicture: joi.object({
    name: joi.string()
      .alphanum(),
    lastModified: joi.number(),
    size: joi.number(),
    type: joi.string().alphanum(),
  }).allow(null, ''),
  iduser: joi.number()
}).unknown();

module.exports = { PostSchema };