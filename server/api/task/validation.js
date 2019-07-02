const Joi = require("joi");

module.exports.upsert = Joi.object().keys({
    _id: Joi.string(),
    description: Joi.string(),
    isCompleted: Joi.boolean()
});
