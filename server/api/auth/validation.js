const Joi = require("joi");

module.exports.create = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});
