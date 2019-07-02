const CustomError = require("../../error");
const errorType = require("../../error/model").type;
const Joi = require("joi");
const validation = require("./validation");
const TaskSchema = require("../../models/Task");

/**
 * Task getter
 * @return {Object Array} Task
 */
const findAllService = async (req) => {
    const userId = req.user._id;
    const fetch = await TaskSchema.getAllTasksByUserId(userId);
    return fetch;
};

/**
 * Task creator or updater
 * @param {MongooseObjectId} _id
 * @param {String} description
 * @param {Boolean} isCompleted
 * @return {Object} vehicle
 */
const upsertTaskService = async (req) => {
    const result = Joi.validate(req.body, validation.upsert);

    if (result.error) {
        throw new CustomError(errorType.bodyError, result.error.details[0].message);
    }

    if (
        Object.keys(result.value).length === 1 &&
    Object.keys(result.value)[0] !== "description"
    ) {
        throw new CustomError(errorType.bodyError, "Not valid body parameters");
    }

    // mutable assign
    Object.assign(result.value, { userId: req.user._id });

    return TaskSchema.upsertTask(
        {
            _id: result.value._id || null,
            userId: result.value.userId
        },
        result.value
    );
};

/**
 * Task delete
 * @reqparams {MongooseObjectId}
 * @return {Boolean}
 */
const removeTaskService = async (req) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await TaskSchema.getOneTaskByTaskIdAndUserId(taskId, userId);

    if (!task) {
        throw new CustomError(
            errorType.paramError,
            "Parameter data can't be populated, task does not exist."
        );
    }

    const deleted = await TaskSchema.removeTask({ _id: taskId, userId: userId });
    return {
        deleted: (deleted && true) || false,
        _id: taskId
    };
};

module.exports.findAllService = findAllService;
module.exports.upsertTaskService = upsertTaskService;
module.exports.removeTaskService = removeTaskService;
