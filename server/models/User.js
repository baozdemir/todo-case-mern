const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Task = require("./Task");

const User = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true
        },
        password: {
            type: String
        },
        userTasks: [{ type: ObjectId, ref: "Task" }]
    },
    {
        timestamps: true
    }
);

User.pre("remove", async (next) => {
    const Model = this;
    await Task.delete({ userId: Model._id });
    next();
});

User.statics = {
    getOneUserByUsernameAndPassword(username, password) {
        const Model = this;
        return Model.findOne(
            {
                username: username,
                password: password
            },
            "username createdAt"
        ).populate({
            model: "Task",
            path: "userId"
        });
    },
    addUser(saveParams) {
        const Model = this;
        const saveOperation = new Model(saveParams);

        return saveOperation.save();
    }
};

/**
 * @typedef User
 */

module.exports = mongoose.model("User", User);
