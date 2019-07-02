const CustomError = require("../../error");
const errorType = require("../../error/model").type;
const Joi = require("joi");
const validation = require("./validation");
const UserSchema = require("../../models/User");
const { encrypt } = require("../../helper/crypto");
const { getToken } = require("../../helper/token");

/**
 * Login Service
 * @param {username}
 * @param {password}
 * @return {Object} user (and token in this user)
 */
const loginService = async (req, res) => {
    const result = Joi.validate(req.body, validation.create);
    if (result.error) {
        throw new CustomError(errorType.bodyError, result.error.details[0].message);
    }

    const { username, password } = result.value;

    let user = await UserSchema.getOneUserByUsernameAndPassword(
        username,
        encrypt(password)
    );

    if (!user) {
        throw new CustomError(
            errorType.authenticationError,
            "Username or password is wrong!"
        );
    }

    const token = getToken(JSON.parse(JSON.stringify(user)));

    return { user, token };
};

module.exports.loginService = loginService;
