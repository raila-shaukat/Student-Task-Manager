const tasks = require("../models/taskModel");

// Home Page
exports.home = (req, res) => {
    res.render("index");
};

// View All Tasks
exports.getTasks = (req, res) => {
    res.render("tasks", { tasks });
};

// Show Add Task Form
exports.showAddTask = (req, res) => {
    res.render("addTask");
};

// Save Task
exports.addTask = (req, res) => {

    const { title, description } = req.body;

    tasks.push({
        id: Date.now(),
        title,
        description
    });

    res.redirect("/tasks");
};