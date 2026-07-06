console.log("Task Model Loaded");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    },

    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium"
    },

    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);

//module.exports = tasks;