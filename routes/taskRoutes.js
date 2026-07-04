const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/", taskController.home);

router.get("/tasks", taskController.getTasks);

router.get("/tasks/new", taskController.showAddTask);

router.post("/tasks", taskController.addTask);

router.get("/tasks/edit/:id", taskController.showEditTask);

router.post("/tasks/update/:id", taskController.updateTask);

router.post("/tasks/delete/:id", taskController.deleteTask);
module.exports = router;