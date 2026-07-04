console.log("Task Controller Loaded");
const tasks = require("../models/taskModel");

// Home Page
exports.home = (req, res) => {
    res.render("index");
};

// View All Tasks
exports.getTasks = (req, res) => {

    console.log("===== GET TASKS =====");
    console.log(tasks);

    res.render("tasks", { tasks });
};

// Show Add Task Form
exports.showAddTask = (req, res) => {
    res.render("addTask");
};

// Save Task
exports.addTask = (req, res) => {

    const { title, description } = req.body;

    console.log("===== BEFORE PUSH =====");
    console.log(tasks);
    console.log("Length Before:", tasks.length);

    tasks.push({
        id: Date.now(),
        title,
        description
    });

    console.log("===== AFTER PUSH =====");
    console.log(tasks);
    console.log("Length After:", tasks.length);

    res.redirect("/tasks");
};

// Show Edit Page
exports.showEditTask = (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    res.render("editTask", { task });

};

// Update Task
exports.updateTask = (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (task) {
        task.title = req.body.title;
        task.description = req.body.description;
    }

    res.redirect("/tasks");

};

// Delete Task
exports.deleteTask = (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);
    }

    res.redirect("/tasks");

};