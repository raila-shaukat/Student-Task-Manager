console.log("Task Controller Loaded");
const tasks = require("../models/taskModel");

// Home Page
exports.home = (req, res) => {
    res.render("index");
};

// View All Tasks
exports.getTasks = (req, res) => {

    const search = req.query.search || "";
    const priority = req.query.priority || "";
    const status = req.query.status || "";

    let filteredTasks = tasks;

    if (search) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (priority) {
        filteredTasks = filteredTasks.filter(task =>
            task.priority === priority
        );
    }

    if (status) {
        filteredTasks = filteredTasks.filter(task =>
            task.status === status
        );
    }

    res.render("tasks", {
        tasks: filteredTasks,
        search,
        priority,
        status
    });

};

// Show Add Task Form
exports.showAddTask = (req, res) => {
    res.render("addTask");
};

// Save Task
exports.addTask = (req, res) => {

    const {
        title,
        description,
        dueDate,
        priority,
        status
    } = req.body;

    console.log("===== BEFORE PUSH =====");
    console.log(tasks);
    console.log("Length Before:", tasks.length);

    tasks.push({
        
    id: Date.now(),
    title,
    description,
    dueDate,
    priority,
    status

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
        task.dueDate = req.body.dueDate;
        task.priority = req.body.priority;
        task.status = req.body.status;

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