const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/", taskController.home);

router.get("/tasks", taskController.getTasks);

module.exports = router;