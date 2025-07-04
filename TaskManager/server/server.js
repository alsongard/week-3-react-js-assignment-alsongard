const express = require("express");
const app = express();
const Task = require("./models/tasks.model.js");
const cors = require('cors');
require("dotenv").config()
const path = require("node:path");
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({extended:false}));


const corsOptions = {
    origin: function (origin, callback)
    {
        // 1. Handle non-production environment FIRST
        if (process.env.NODE_ENV !== "production") {
        console.log(`[DEV] Allowing origin: ${origin}`);
        return callback(null, true); // RETURN after callback
        }
        const AllowedDomains = [
            "https://my-tasks-project.vercel.app",
            "http://localhost:5173"
        ]

        // to allow request with no origin: that is postman or curl
        if (!origin)
        {
            return callback(null, true);
        }
        if (AllowedDomains.indexOf(origin) !== -1)
        {
            callback(null, true); // alow origin
        }
        else
        {
            callback( new Error(`Origin: ${origin} not allowed by CORS. Check server to allow domain`), false);
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
app.options('/{*any}', cors(corsOptions)); 

app.use(cors(corsOptions));

app.use((req, res, next) => {
  // Manually set headers for all responses
  res.header("Access-Control-Allow-Origin", 
    process.env.NODE_ENV === "production" 
      ? "https://my-tasks-project.vercel.app" 
      : "*");
  
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.options("*",cors(corsOptions)); // preflight option request: usefull for security and enables the browser
// to request the resource from the backend before sending or getting the data(formVerification)

// error handling middleware
app.use((err, req, res, next)=>{
    console.log(`Server error: ${err.stack}`);
    res.send("<h1>Server Error </h1>");
})

app.use(express.static("public"));

app.get("/", (req, res)=>{
    return res.sendFile(path.join(__dirname,'public', 'index.html'))
})
// get all tasks === working successfully
// app.get("/tasks", async (req, res)=>{
app.get("/tasks", async (req, res)=>{
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

// get task based on Id == working successfully
// app.get("/task/:id", async (req, res)=>{
app.get("/task/:id", async (req, res)=>{
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
app.put("/task/:id", async (req, res)=>{
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
app.delete("/task/:id", async (req, res)=>{
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
// app.post("/task", async (req, res)=>{
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
});



const portNumber = 5001;
const secret = process.env.TASK_SECRET;
const user = process.env.TASK_USER;

const connectMongoDB = async ()=>{

    try
    {

        await mongoose.connect(`mongodb+srv://${user}:${secret}@cluster0.iqbumv5.mongodb.net/tasks?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("Connected To Database");
        if (!process.env.VERCEL)
        {
            app.listen(portNumber, ()=>{
                console.log(`Server is listening on port ${portNumber}`);
            })
        }
    }
    catch(err)
    {
        console.log("Failed to connect");
        console.log(`Error : ${err.message}`);
        process.exit(1);
    }

}
connectMongoDB();

module.exports = app;
