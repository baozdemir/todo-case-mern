module.exports = (error) => {
    return {
        type: error.type || error.constructor.name,
        message: error.message || "Call the police",
        status: error.status || 500,
        stack: error.stack || "Hell"
    };
};
