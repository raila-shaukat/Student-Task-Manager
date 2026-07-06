console.log("Task Controller Loaded");

const Task = require("../models/taskModel");

// Home Page
exports.home = (req, res) => {
    res.render("index");
};

// View All Tasks
exports.getTasks = async (req, res) => {

    const search = req.query.search || "";
    const priority = req.query.priority || "";
    const status = req.query.status || "";
    const sort = req.query.sort || "";

    // MongoDB se saare tasks lao
    let filteredTasks = await Task.find();

    // Search
    if (search) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Priority Filter
    if (priority) {
        filteredTasks = filteredTasks.filter(task =>
            task.priority === priority
        );
    }

    // Status Filter
    if (status) {
        filteredTasks = filteredTasks.filter(task =>
            task.status === status
        );
    }

    // Sort by Title
    if (sort === "title") {
        filteredTasks.sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    // Sort by Due Date
    if (sort === "date") {
        filteredTasks.sort((a, b) =>
            new Date(a.dueDate) - new Date(b.dueDate)
        );
    }

    // Sort by Priority
    if (sort === "priority") {

        const priorityOrder = {
            High: 1,
            Medium: 2,
            Low: 3
        };

        filteredTasks.sort((a, b) =>
            priorityOrder[a.priority] - priorityOrder[b.priority]
        );

    }

    // Dashboard Statistics
    const totalTasks = filteredTasks.length;

    const pendingTasks = filteredTasks.filter(task =>
        task.status === "Pending"
    ).length;

    const completedTasks = filteredTasks.filter(task =>
        task.status === "Completed"
    ).length;

    res.render("tasks", {
        tasks: filteredTasks,
        search,
        priority,
        status,
        totalTasks,
        pendingTasks,
        completedTasks
    });

};

// Show Add Task Form
exports.showAddTask = (req, res) => {
    res.render("addTask");
};

// Save Task
console.log("addTask function called");
exports.addTask = async (req, res) => {

    try {

        const {
            title,
            description,
            dueDate,
            priority,
            status
        } = req.body;

        // Validation
        if (!title || !description || !dueDate || !priority || !status) {

            req.flash("error", "All fields are required.");
            return res.redirect("/tasks/new");

        }

        if (description.length < 10) {

            req.flash("error", "Description must be at least 10 characters.");
            return res.redirect("/tasks/new");

        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(dueDate) < today) {

            req.flash("error", "Due date cannot be in the past.");
            return res.redirect("/tasks/new");

        }

        await Task.create({
            title,
            description,
            dueDate,
            priority,
            status
        });

        req.flash("success", "Task added successfully.");
        res.redirect("/tasks");

    } catch (error) {

        console.log(error);
        req.flash("error", "Something went wrong.");
        res.redirect("/tasks/new");

    }

};

// Show Edit Page
exports.showEditTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        res.render("editTask", { task });

    } catch (error) {

        console.log(error);
        res.send("Task Not Found");

    }

};

// Update Task
exports.updateTask = async (req, res) => {

    try {

        await Task.findByIdAndUpdate(req.params.id, {

            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            status: req.body.status

        });

        req.flash("success", "Task updated successfully.");
        res.redirect("/tasks");

    } catch (error) {

        console.log(error);
        res.send("Error Updating Task");

    }

};

// Delete Task
exports.deleteTask = async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        req.flash("success", "Task deleted successfully.");
        res.redirect("/tasks");

    } catch (error) {

        console.log(error);
        res.send("Error Deleting Task");

    }

};

// completed task
exports.completeTask = async (req, res) => {

    try {

        await Task.findByIdAndUpdate(req.params.id, {
            status: "Completed"
        });

        req.flash("success", "Task marked as completed.");
        res.redirect("/tasks");

    } catch (error) {

        console.log(error);
        res.send("Error Completing Task");

    }

};