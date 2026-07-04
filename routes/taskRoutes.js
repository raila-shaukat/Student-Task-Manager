const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/", taskController.home);

router.get("/tasks", taskController.getTasks);

router.get("/tasks/new", taskController.showAddTask);

router.post("/tasks", taskController.addTask);

module.exports = router;