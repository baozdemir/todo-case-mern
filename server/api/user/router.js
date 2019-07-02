"use strict";

const router = require("express").Router();
const { createUserService } = require("./services");

const create = async (req, res, next) => {
    try {
        const save = await createUserService(req);
        res.json(save);
    }
    catch (error) {
        next(error);
    }
};

router.post("/", create);

module.exports = router;
