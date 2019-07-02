"use strict";

const router = require("express").Router();
const {
    findAllService,
    upsertTaskService,
    removeTaskService
} = require("./services");
const isAuthorized = require("../../middlewares/authentication");

const getAllRoute = async (req, res, next) => {
    try {
        const get = await findAllService(req);
        res.json(get);
    }
    catch (error) {
        next(error);
    }
};

const upsertRoute = async (req, res, next) => {
    try {
        const get = await upsertTaskService(req);
        res.json(get);
    }
    catch (error) {
        next(error);
    }
};

const deleteRoute = async (req, res, next) => {
    try {
        const get = await removeTaskService(req);
        res.json(get);
    }
    catch (error) {
        next(error);
    }
};

router.get("/", isAuthorized, getAllRoute);
router.post("/", isAuthorized, upsertRoute);
router.delete("/:id", isAuthorized, deleteRoute);

module.exports = router;
