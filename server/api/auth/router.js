"use strict";

const router = require("express").Router();
const services = require("./services");

const login = async (req, res, next) => {
    try {
        const get = await services.loginService(req, res);
        res.json(get);
    }
    catch (e) {
        next(e);
    }
};

router.post("/login", login);

module.exports = router;
