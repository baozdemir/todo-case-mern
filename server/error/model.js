module.exports = {
    type: {
        authorizationError: "authorizationError",
        authenticationError: "authenticationError",
        paramError: "paramError",
        queryError: "queryError",
        uploadError: "uploadError",
        bodyError: "bodyError",
        processError: "processError",
        notFoundError: "notFoundError",
        databaseError: "databaseError"
    },
    status: {
        authorizationError: 403,
        authenticationError: 401,
        paramError: 400,
        queryError: 400,
        uploadError: 400,
        bodyError: 400,
        processError: 400,
        notFoundError: 404,
        databaseError: 500
    }
};
