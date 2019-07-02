const { status } = require("./model");

/**
 * @typedef CustomError
 * @extends Error
 */
module.exports = class CustomError extends Error {
    constructor(errorType, message, errorContent) {
        super(message);
        this.type = errorType;
        this.status = status[errorType];
        this.errorContent = errorContent;
        Error.captureStackTrace(this, this.constructor);
    }
};
