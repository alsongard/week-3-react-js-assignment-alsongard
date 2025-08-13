
const Task = require("../models/tasks.model");



const getAllTasks = async (req, res)=>{
    try
    {
        const allTasks = await Task.find();
        // console.log(allTasks);// works
        return res.status(200).json(allTasks);
    }
    catch(err)
    {
        console.log(`error ${err.message}`);
        return res.status(401).json({success: false, msg: `Error : ${err.message}`});
    }
}



const getTaskOnId = async (req, res)=>{
    const {id} = req.params;

    console.log(`This is id ${id}`);
    try
    {
        //filter data
        const foundTask = await Task.findById(id);
        if (foundTask)
        {
            console.log(foundTask);
            return res.status(200).json(foundTask);
        }
        else
        {
            return res.status(301).json({success: false, msg: `No product found with the id : ${id}`});
        }
    }
    catch(err)
    {
        console.log(`Error : ${err}`);
        return res.json({success: false, msg: `Error : ${err}`});
    }
}

const updateTaskOnId = async (req, res)=>{
    const {id} = req.params;
    console.log(req.body)
    try
    {
        const taskUpdated = await Task.findByIdAndUpdate(id, req.body);
        if (taskUpdated)
        {
            console.log(`update on Task Successfull: now moving to next...`)
            // console.log(taskUpdated);
            const updatedTask =  await Task.findById(id)
            return res.status(200).json(updatedTask);
        }
        else
        {
            console.log(taskUpdated);
            return res.status(404).json({success: false, msg: `Task with id ${id} not updated`})
        }
    }
    catch(err)
    {
        console.log(`Error : ${err.message}`);
        return res.status(401).json({success: false, msg: `Error : ${err.message}`})
    }
}

const deleteTaskOnId = async (req, res)=>{
    const {id} = req.params;

    try
    {
        const foundProduct = await Task.findByIdAndDelete(id);
        
        if (foundProduct)
        {
            console.log(foundProduct);
            return res.status(200).json({msg: `Product with id : ${id} has been successful deleted`});
        }
        else
        {
            return res.status(404).json({success:false, msg:`No product with the id : ${id} found`})
        }
    }
    catch(err)
    {
        console.log(`Error: ${err.message}`)
        return res.status(401).json({success: false, msg: `Error: ${err.message}`})
    }
}


const addTask = async (req, res)=>{
    console.log(req.body);
    try
    {

        const taskCreatedData = await Task.create(req.body);
        console.log(taskCreatedData);
        return res.status(200).json(taskCreatedData)
    }
    catch(err)
    {
        console.log(`Error : ${err.message}`);
    }
}

module.exports = {getAllTasks, getTaskOnId, updateTaskOnId, deleteTaskOnId, addTask};


