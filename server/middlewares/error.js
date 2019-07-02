const errorStructure = require("../error/structure");
const errorType = require("../error/model").type;
const CustomError = require("../error");

// Here you can check the error you want to check and set the return value accordingly.
module.exports = async (error, req, res, next) => {
    if (error && error instanceof CustomError) {
        const errRes = errorStructure(error);
        res.status(errRes.status).json(errRes);
    }

    // it's custom error handling, you can use like this
    else if (error.name === "MongoError" && error.code === 11000) {
        module.exports(
            new CustomError(errorType.databaseError, "It's already using"),
            req,
            res,
            next
        );
    }
    else if (error) {
        const errRes = errorStructure(error);
        res.status(errRes.status).json(errRes);
    }
    else {
        next();
    }
};
