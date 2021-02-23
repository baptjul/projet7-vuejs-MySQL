const joi = require('joi');

const PostSchema = joi.object({
  post: joi.string()
    .regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
    .allow(null, ''),
  file: joi.object({
    fieldname: joi.string(),
    originalname: joi.string(),
    encoding: joi.string(),
    mimetype: joi.string(),
    destination: joi.string(),
    filename: joi.string(),
    path: joi.string(),
    size: joi.number()
  }).allow(null, ''),
  iduser: joi.number()
}).unknown();

module.exports = { PostSchema };