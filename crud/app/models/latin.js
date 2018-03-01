const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schema = {
    _id: Joi.objectId(),
    latin: Joi.string().required(),
    english: Joi.string().required()
}

module.exports = Joi.object().keys(schema);