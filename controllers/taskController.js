const tasks = require("../models/taskModel");

// Home Page
exports.home = (req, res) => {
    res.render("index");
};

// View All Tasks
exports.getTasks = (req, res) => {
    res.render("tasks", { tasks });
};