"use strict";

const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
    getToken: (data) => {
        return jwt.sign(data, config.token.access.secret, {
            expiresIn: config.token.access.options.expiresIn
        })
    }
};
