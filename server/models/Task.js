const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Task = new Schema(
    {
        description: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        userId: {
            type: ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);

Task.statics = {
    getAllTasksByUserId(userId) {
        const Model = this;
        return Model.find({
            userId: userId
        }).sort([["createdAt", -1]]);
    },
    getOneTaskByTaskIdAndUserId(taskId, userId) {
        const Model = this;
        return Model.findOne({
            _id: taskId,
            userId: userId
        });
    },
    upsertTask(query, body) {
        const Model = this;
        return Model.findOneAndUpdate(
            {
                _id: query._id || mongoose.Types.ObjectId()
            },
            body,
            { new: true, upsert: true }
        );
    },

    removeTask(query) {
        const Model = this;
        return Model.findByIdAndRemove(query);
    }
};

mongoose.set("useFindAndModify", false);

/**
 * @typedef Task
 */

module.exports = mongoose.model("Task", Task);
