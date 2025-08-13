const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config()
const path = require("node:path");
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const taskRoutes = require("./routes/tasks.router.js");;

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
            console.log(`Allowed Origin: ${origin}`);
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
// app.options('/{*any}', cors(corsOptions));   handles by app.use(cors()) middleware

app.use(cors(corsOptions));



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

// using routes
app.use("/api/task",taskRoutes)



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
