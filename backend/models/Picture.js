const joi = require('joi');

const PictureSchema = joi.object({
  file: joi.object({
    fieldname: joi.string(),
    originalname: joi.string(),
    encoding: joi.string(),
    mimetype: joi.string(),
    destination: joi.string(),
    filename: joi.string(),
    path: joi.string(),
    size: joi.number()
  }).allow(null, '')
}).unknown();

module.exports = { PictureSchema };