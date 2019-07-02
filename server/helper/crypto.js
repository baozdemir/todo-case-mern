"use strict";

const { createCipher, createDecipher } = require("crypto");

module.exports = {
    encrypt: (password) => {
        try {
            let cipher = createCipher("aes-256-cbc", process.env.PASSWORD_SECRET);
            let crypted = cipher.update(password, "utf8", "hex");
            crypted += cipher.final("hex");
            return crypted;
        }
        catch (error) {
            return null;
        }
    },
    decrypt: (password) => {
        try {
            let decipher = createDecipher("aes-256-cbc", process.env.PASSWORD_SECRET);
            let dec = decipher.update(password, "hex", "utf8");
            dec += decipher.final("utf8");
            return dec;
        }
        catch (error) {
            return null;
        }
    }
};
