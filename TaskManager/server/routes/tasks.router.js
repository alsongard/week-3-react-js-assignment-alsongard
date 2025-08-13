const express = require('express');
const router = express.Router();
const {getAllTasks, getTaskOnId, updateTaskOnId, deleteTaskOnId, addTask} = require("../controllers/task.controllers")


// get all tasks
router.get("/", getAllTasks)

// get task based on Id
router.get("/:id", getTaskOnId);


// updateTaskBased on Id
router.put("/:id", updateTaskOnId);

// delete task based on Id
router.delete("/:id", deleteTaskOnId);


// add task based on Id
router.post("/", addTask)

module.exports = router;



