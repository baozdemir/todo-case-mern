process.on("unhandledRejection", (reason) => {
    console.error("unhandledRejection: ");
    console.error(reason);
    process.exit(1);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");

const router = require("./router");
const mongo = require("./db/mongo");
const errorMiddleware = require("./middlewares/error");

dotenv.config({ path: ".env" });

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
}

app.use(cors());

mongo.start();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));

router(app);

/** GET /health-check - Check service health */
app.get("/is-alive", (req, res) => {
    return res.send("YES");
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    return console.log(`App listening on port ${process.env.PORT}!`);
});

module.exports = app;
