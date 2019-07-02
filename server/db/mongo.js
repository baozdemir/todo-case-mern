"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

module.exports.start = async () => {
    const url = `mongodb+srv://${process.env.DB_USER}:${
        process.env.DB_PASSWORD
    }@test-hxqtm.mongodb.net/test?retryWrites=true&w=majority`;

    await mongoose.connect(url, {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: 1000000,
        reconnectInterval: 3000,
        useCreateIndex: true
    });
};

mongoose.connection.on("connected", () => {
    console.log("Mongo Connection Established");
});

mongoose.connection.on("reconnected", () => {
    console.log("Mongo Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongo Connection Disconnected");
});

mongoose.connection.on("close", () => {
    console.log("Mongo Connection Closed");
});

mongoose.connection.on("error", (error) => {
    console.log("Mongo ERROR: " + error);
});
