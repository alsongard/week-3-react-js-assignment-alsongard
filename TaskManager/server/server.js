const express = require("express");
const app = express();
const Task = require("./models/tasks.model.js");
const cors = require('cors');
require("dotenv").config()
const mongoose = require("mongoose");


app.use(express.json());
app.use(express.urlencoded({extend:false}));
app.use(cors(
    {
        origin: "https://week-3-react-js-assignment-alsongar.vercel.app",
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
))
// require("")
 
app.get("/", (req, res)=>{
    return res.send("<h1>Hello </h1>")
})
// get all tasks === working successfully
// app.get("/tasks", async (req, res)=>{
app.get("https://week-3-react-js-assignment-alsongar.vercel.app/tasks", async (req, res)=>{
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
//https://week-3-react-js-assignment-alsongar.vercel.app/
// get task based on Id == working successfully
// app.get("/task/:id", async (req, res)=>{
app.get("https://week-3-react-js-assignment-alsongar.vercel.app/task/:id", async (req, res)=>{
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
});


// update modify task
// app.put("/task/:id", async (req, res)=>{
app.put("https://week-3-react-js-assignment-alsongar.vercel.app/task/:id", async (req, res)=>{
    const {id} = req.params;
    console.log(req.body)
    try
    {
        const taskUpdated = await Task.findByIdAndUpdate(id, req.body);
        if (taskUpdated)
        {
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
})



// delete Task == working successfully
app.delete("https://week-3-react-js-assignment-alsongar.vercel.app/task/:id", async (req, res)=>{
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
});




// add tasks == working
app.post("/task", async (req, res)=>{
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
})
const portNumber = 5001;
const secret = process.env.TASK_SECRET;
const user = process.env.TASK_USER;
mongoose.connect(`mongodb+srv://${user}:${secret}@cluster0.iqbumv5.mongodb.net/tasks?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log("Connected To Database")
        app.listen(portNumber, ()=>{
            console.log(`Server is listening on port ${portNumber}`);
        })
    })
    .catch((err)=>{
        console.log("Failed to connect");
        console.log(`Error : ${err.message}`)
    })


