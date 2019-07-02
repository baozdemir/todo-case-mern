"use strict";

const jwt = require("jsonwebtoken");
const env = require("../config");
const CustomError = require("../error");
const errorType = require("../error/model").type;

module.exports = async (req, res, next) => {
    const authHeader = req.headers["authorization"] || req.headers["token"];

    if (!authHeader) {
        next(new CustomError(errorType.authenticationError, "No token provided."));
    }
    else {
        let token = "";

        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7, authHeader.length);
        }
        else {
            token = req.headers["authorization"];
        }

        try {
            const decoded = await jwt.verify(token, env.token.access.secret);

            req.user = decoded;
            next();
        }
        catch (e) {
            // expired case
            // aka token is not valid anymore, so new token needed
            if (e.name === "TokenExpiredError") {
                next(
                    new CustomError(
                        errorType.authenticationError,
                        `Protected resource, TokenExpiredError: ${e.message}`
                    )
                );
            }

            // revoked case
            // aka user changed password or sth else, so new token needed
            if (e.name === "Token revoked") {
                next(
                    new CustomError(
                        errorType.authenticationError,
                        `Protected resource, TokenRevokedError:: ${e.message}`
                    )
                );
            }
            next(new CustomError(errorType.authenticationError, e.message));
        }
    }
};
