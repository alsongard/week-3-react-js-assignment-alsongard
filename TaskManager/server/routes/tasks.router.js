const express = require('express');
const Task = require("../models/tasks.model");
const router = express.Router();

// get all tasks
router.get("/", async (req, res)=>{
    try
    {
        const allTasks = await Task.find();
        console.log(allTasks);// works
        return res.status(200).json(allTasks);
    }
    catch(err)
    {
        console.log(`error ${err.message}`);
        return res.status(401).json({success: false, msg: `Error : ${err.message}`});
    }
})




