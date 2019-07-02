"use strict";

const CustomError = require("../../error");
const errorType = require("../../error/model").type;
const Joi = require("joi");
const validation = require("./validation");
const UserSchema = require("../../models/User");
const { getToken } = require("../../helper/token");
const { encrypt } = require("../../helper/crypto");

/**
 * User creator
 * @param {String} username
 * @param {String} password
 * @return {Object}
 */
const createUserService = async (req) => {
    const result = Joi.validate(req.body, validation.create);
    if (result.error) {
        throw new CustomError(errorType.bodyError, result.error.details[0].message);
    }

    // mutable assign
    Object.assign(result.value, { password: encrypt(result.value.password) });

    const user = await UserSchema.addUser(result.value);

    const retValUser = {
        _id: user._id,
        username: user.username,
        createdAt: user.createdAt
    };
    const token = getToken(retValUser);

    return {
        user: retValUser,
        token
    };
};

module.exports.createUserService = createUserService;
