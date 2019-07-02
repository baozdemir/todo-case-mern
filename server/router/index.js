module.exports = (app) => {
    app.use("/api/v1/user", require("../api/user/router"));
    app.use("/api/v1/auth", require("../api/auth/router"));
    app.use("/api/v1/task", require("../api/task/router"));
};
