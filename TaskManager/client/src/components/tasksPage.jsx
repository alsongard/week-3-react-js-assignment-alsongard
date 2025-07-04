import { useEffect, useState } from "react";

import axios from "axios";

const taskAPi = "https://alson-task-api.vercel.app"
function TaskManager()
{
    // AllTaskState
    const [taskData, setTaskData] = useState([]);
    const [displayAllTask, setDisplayAllTask] = useState(false);


    //SingletaskFormData state
    const [singleTaskFormData, setSingleTaskFormData] = useState({
        taskId: ""
    });
    const [singleTaskData, setSingleTaskData] = useState({});

    // const [displaySingleTask, setDisplaySingleTask] = useState(false); 
    const [displaySingleTaskForm, setDisplaySingleTaskForm] = useState(false);





    const [errorMsg, setErrorMsg] = useState({mgs: ""})



    async function getAllTask() // working === successfully
    {
        console.log("Getting all Tasks");
        await axios.get(`${taskAPi}/tasks`)
            .then((res)=>{
                console.log(res)
                if (res.data)
                {
                    return res.data;
                }
                else{
                    return setErrorMsg("Could not get data from api")
                }
            })
            .then((data)=>{
                console.log(data);
                setTaskData(data);
            })
            .catch((err)=>{
                console.log(`Error : ${err}`)
            })
    };




    // getSingle Task

    function handleSingleChange(event)
    {
        const {name, value} = event.target;
        setSingleTaskFormData((prevData)=>{
            return {
                ...prevData,
                [name]: value
            }
        })
    };

    function displaySingleForm()
    {
        setDisplaySingleTaskForm(true);
    }
    
    async function getSingleTask()
    {
        console.log("getting single tasks");
        try
        {
            
            const res = await axios.get(`${taskAPi}/task/${singleTaskFormData.taskId}`);
            console.log(res);
            const data = await res.data;
            setTaskData([data]);
        }
        catch(err)
        {
            console.log(`Error : ${err}`);
        }
    }


     function handleSingleSubmit(event)
    {
        event.preventDefault();
        console.log(`event.preventDefault() is working`)
        getSingleTask();
    }

    useEffect(()=>{
        console.log(`This is taskData`);
        console.log(taskData);
        setDisplayAllTask(true);
        console.log(`Displaying ${displayAllTask} `)
        if (taskData.length >= 1)
        {
            console.log(`TaskData has length of ${taskData.length} `)
        }
    }, [taskData]);



    // UPDATE FUNCTIONALITY SETUP

    const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
    const [updateFormItem, setUpdateFormItem] = useState({
        taskDetail: ""
    });

    function handleTaskDetailItem(event)
    {
        const {name, value} = event.target;
        setUpdateFormItem((prevData)=>{
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    const [taskUpdateData, setTaskUpdateData] = useState(
        {
            task_name: ""
        }
    );
    
    function handleUpdateTaskInfo(event)
    {
        const {name, value} = event.target;
        setTaskUpdateData((prevData)=>{
                return {
                    ...prevData,
                    [name]:value
                }
            })
    };


    function getUpdate()
    {
        setDisplayUpdateForm(true);
    }

    async function updateTask()
    {
        try
        {
            const res = await axios.put(`${taskAPi}/task/${singleTaskFormData.taskId}`, taskUpdateData,{
                headers: {'Content-Type': "application/json"},
                withCredentials: true
            }
            );
            // const res = await axios.put("http://localhost:5001/task/685cfb3543ad3a0166eb1480", taskUpdateData);
            
            const data = await res.data;
            setTaskData([data]);
            // console.log("This is updateTask");
            // console.log(res);
            // const data = res.data;
            // console.log(data);
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }

    }
    function handleUpdateSubmit(event)
    {
        event.preventDefault();
        updateTask(); 
    }


    // CREATE TASKS
    const [displayNewTaskForm, setDisplayNewTaskForm] = useState(false);
    const [newTaskData, setNewTaskData] = useState({
        task_name: "",
        task_description: "",
        task_startDate: "",
        task_endDate: "",
        status: "",
        priority: "", 
        assignee: "",
    })
    function getTaskBtn()
    {
        setDisplayNewTaskForm(true);
    }
    function handlenewTaskForm(event)
    {
        const {name, value}= event.target;
        setNewTaskData((prevData)=>{
            return {
                ...prevData,
                [name] : value
            }
        })

    }
    async function createTask()
    {
        try
        {
            // const res = await axios.post("http://localhost:5001/task", newTaskData);
            const res = await axios.post(`${taskAPi}/task`, newTaskData, {
                headers : {"Content-Type": "application/json"},
                withCredentials: true
            });
            console.log(res);
            const {data} = res;
            setTaskData([data]);


        }
        catch(err)
        {
            console.log(`Error : ${err}`)
        }
    }
    function handleCreateTask(event)
    {
        event.preventDefault();
        console.log("Running handleCreateTask")
        createTask()
    }

    // DELETE TASK FUNCTION
    const [displayDeleteForm, setDisplayDeleteForm] = useState(false);
    const [deleteMsg, setDeleteMsg] = useState()
    function deleteTaskBtn()
    {
        setDisplayDeleteForm(true);
    }

    async function deleteTask()
    {
        try
        {
            const res = await axios.delete(`${taskAPi}/task/${singleTaskFormData.taskId}`, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log(res);
            const {msg}= res.data;
            setDeleteMsg(msg);
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }

    }
    function handleDeleteTask(event)
    {
        event.preventDefault();
        deleteTask();
    }
    let content;
    if (taskData.length >= 1)
    {
         content = taskData.map((taskItem)=>{
            console.log(`the following are taskItem`);
            console.log(taskItem)
            return (
                <div className="shadow-[0px_0px_5px_blue] bg-gradient-to-r from-slate-200 dark:from-slate-700 dark:to-slate-700 to-slate-400 p-[20px] rounded-md" id={taskItem._id}>
                    <p className="text-[18px]"><span className="font-bold">task Name :</span> {taskItem.task_name}</p>
                    <p className="text-[18px]"><span className="font-bold">task Description:</span> {taskItem.task_description}</p>
                    <p className="text-[18px]"><span className="font-bold">task Priority:</span> {taskItem.priority}</p>
                    <p className="text-[18px]"><span className="font-bold">task Status:</span> {taskItem.status}</p>
                    <p className="text-[18px]"><span className="font-bold">task start date</span> : {new Date(taskItem.task_startDate).toLocaleDateString()}</p>
                    <p className="text-[18px]"><span className="font-bold">task end date</span> : {new Date(taskItem.task_endDate).toLocaleDateString()}</p>
                </div>
            )
        })
    }
    function handleClear()
    {
        setDisplaySingleTaskForm(false);
        setDisplayAllTask(false);
        setDisplayUpdateForm(false);
        setUpdateFormItem({taskDetail: ""})
        setDisplayUpdateForm(false);
        setDisplayNewTaskForm(false);
        setDisplayDeleteForm(false);
        setTaskData({});
    }
    return (
        <section className="dark:bg-gray-900  w-full border-2 border-black py-[50px] ">
            <h1 className="text-center text-[30px] text-bold">TasksManager</h1>

            <div className="w-[1200px] mx-auto dark:text-white  p-[50px] rounded-md dark:bg-gray-800 ">

                <p className="text-center">Welcome to TaskMaster Pro – where productivity meets simplicity! We're here to help you conquer your to-do list with style and efficiency. Let’s get things done! 🚀</p>
                <ul className="list-disc">
                    <li>View All Tasks</li>
                    <p>Effortlessly browse through your entire list of tasks in one place. Stay organized and never miss a beat.</p>

                    <li>Search Task by ID</li>
                    <p>Quickly find any specific task using its unique identifier – no more scrolling through long lists.</p>

                    <li>Create Tasks / Add Task</li>
                    <p>Bring your ideas to life by adding new tasks in seconds. It’s as easy as jotting down a note.</p>

                    <li>Update Task</li>
                    <p>Plans change – and so can your tasks. Edit details anytime to keep your work aligned and up-to-date.</p>

                    <li>Delete Task</li>
                    <p>Remove clutter with a single click. Delete tasks that are no longer needed to keep your list clean and focused.</p>
                </ul>
                
                <div className="flex flex-col  gap-y-[10px] w-[200px]">
                    {/* <button className="py-[5px] px-[10px] rounded-md bg-gradient-to-r from-[rgb(93,109,126)] to-[rgb(33,47,61)]">View All Tasks</button> */}
                    <button onClick={getAllTask} className="py-[5px] px-[10px] rounded-md bg-[rgb(93,109,126)] ">View All Tasks</button>
                    <button onClick={displaySingleForm} className="py-[5px] px-[10px] rounded-md bg-[rgb(93,109,126)]">View Single Task</button>
                    <button onClick={getUpdate} className="py-[5px] px-[10px] rounded-md bg-[rgb(93,109,126)]">Update Task</button>
                    <button onClick={deleteTaskBtn} className="py-[5px] px-[10px] rounded-md bg-[rgb(93,109,126)]">Delete Task</button>
                    <button onClick={getTaskBtn} className="py-[5px] px-[10px] rounded-md bg-[rgb(93,109,126)]">Add Tasks</button>
                </div>
                

                {/* displaying single tasks */}
                {
                    // this will display if displaySingleTaskForm is true: will display the form for entering the id
                    displaySingleTaskForm && 
                    (<form onSubmit={handleSingleSubmit} className="shadow-[0px_0px_5px_gray] py-[20px] px-[10px] mt-[50px] rounded-md">
                        <label htmlFor="taskId">Enter TaskID: </label>
                        <input onChange={handleSingleChange} className="block border-[1.2px] py-[2px] px-[10px] rounded-md border-black w-full text-black" name="taskId" value={singleTaskFormData.taskId} type="text" placeholder="task id..."/>
                        <input  className="bg-[rgb(46,204,113)] mt-[10px] px-[5px] w-[100px] py-[2.5px] rounded-[5px]" type="submit" value="submit"/>
                    </form>)
                    //onSubmit getSingleTask will be used to fetch the data on the given id
                }

                {
                    // displaying form on Update
                    displayUpdateForm && 
                    (
                        <form onSubmit={handleUpdateSubmit} className="shadow-[0px_0px_5px_gray] py-[20px] px-[10px] mt-[50px] rounded-md">
                            <label htmlFor="taskId">Enter TaskID: </label>
                            <input className="block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black w-full" name="taskId" onChange={handleSingleChange} value={singleTaskFormData.taskId} type="text" placeholder="task id..."/>
                            <label className="block" htmlFor="">Select which property to update</label>
                            <select className="block py-[2.5px] px-[5px] w-[150px] rounded-md text-black " name="taskDetail" onChange={handleTaskDetailItem}>
                                <option selected>--------</option>
                                <option value="task_name">Task Name</option>
                                <option value="task_description">Task Description</option>
                                <option value="task_startDate">Task StartDate</option>
                                <option value="task_endDate">Task EndDate</option>
                                <option value="task_status">Task Status</option>
                                <option value="priority">Priority</option>
                                <option value="assignee">Assignee</option>
                            </select>

                            {updateFormItem.taskDetail == "task_name" && (
                                <div>
                                    <label className="w-full block" >Enter Task Name</label>
                                    <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="text" name="task_name" onChange={handleUpdateTaskInfo} value={taskUpdateData.task_name} />
                                </div>
                            )}

                            {updateFormItem.taskDetail == "task_description" && (
                                <div>
                                    <label className="w-full block" >Enter task Description</label>
                                    <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="text" name="task_description" onChange={handleUpdateTaskInfo} />
                                </div>
                            )}

                            {updateFormItem.taskDetail == "task_startDate" && (
                                <div>
                                    <label className="w-full block"  >Enter task start date</label>
                                    <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="date"  />
                                </div>
                            )}

                            {updateFormItem.taskDetail == "task_endDate" && (
                                <div>
                                    <label className="w-full block" htmlFor="">Enter task end date</label>
                                    <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="date"  />
                                </div>
                            )}

                            {/* task_status */}

                            {updateFormItem.taskDetail == "task_status" && (
                                <div>
                                    <label className="w-full block" htmlFor="">Enter task status</label>
                                    <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="text"  />
                                </div>
                            )}
                            {updateFormItem.taskDetail == "priority" && (
                                <div>
                                    <label className="w-full block">Enter task priority level</label>
                                    <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="number"  />
                                </div>
                            )}

                            {updateFormItem.taskDetail == "assignee" && (
                                <div>
                                    <label className="w-full block">Enter task assignee|Ownwer</label>
                                    <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black"type="text"  />
                                </div>
                            )}

                            <input  className="bg-[rgb(46,204,113)] mt-[10px] px-[5px] w-[100px] py-[2.5px] rounded-[5px]" type="submit" value="submit"/>
                        </form>
                    )
                }



                {/* ADD TASKS */}
                {
                    displayNewTaskForm && (
                        <form  onSubmit={handleCreateTask} className="shadow-[0px_0px_5px_gray] py-[20px] px-[10px] mt-[50px] rounded-md">
                            <label className="w-full block" >Enter Task Name</label>
                            <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="text" name="task_name" onChange={handlenewTaskForm} value={newTaskData.task_name} />
                            
                            <label className="w-full block" >Enter task Description</label>
                            <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="text" name="task_description" onChange={handlenewTaskForm} value={newTaskData.task_description}/>
                            
                            <label className="w-full block"  >Enter task start date</label>
                            <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="date" name="task_startDate" onChange={handlenewTaskForm} value={newTaskData.task_startDate}/>
                            
                            <label className="w-full block" htmlFor="">Enter task end date</label>
                            <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="date" name="task_endDate" onChange={handlenewTaskForm} value={newTaskData.task_endDate} />
                            
                            <label className="w-full block" htmlFor="">Enter task status</label>
                            <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="text" name="status" onChange={handlenewTaskForm} value={newTaskData.status} />
                            
                            <label htmlFor="" className="w-full block">Enter task priority level</label>
                            <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="number" name="priority" onChange={handlenewTaskForm} value={newTaskData.priority}  />
                            
                            <label className="w-full block">Enter task assignee|Ownwer</label>
                            <input className="w-full block border-[1.2px] py-[2px] px-[10px] text-black rounded-md border-black" type="text" name="assignee" onChange={handlenewTaskForm} value={newTaskData.assignee}/>
                            
                            <input  className="bg-[rgb(46,204,113)] mt-[10px] px-[5px] w-[100px] py-[2.5px] rounded-[5px]" type="submit" value="submit"/>
                        </form>
                    )
                }


                {/* DELETE FORM */}
                {
                    displayDeleteForm && (
                        <div>
                            <form onSubmit={handleDeleteTask} className="shadow-[0px_0px_5px_gray] py-[20px] px-[10px] mt-[50px] rounded-md">
                                <label htmlFor="taskId">Enter TaskID: </label>
                                <input onChange={handleSingleChange} className="block border-[1.2px] py-[2px] px-[10px] rounded-md border-black text-black w-full" name="taskId" value={singleTaskFormData.taskId} type="text" placeholder="task id..."/>
                                <input  className="bg-[rgb(46,204,113)] mt-[10px] px-[5px] w-[100px] py-[2.5px] rounded-[5px]" type="submit" value="submit"/>
                            </form>
                            <p>{deleteMsg}</p>
                        </div>
                    )
                }
                {/* diplaying all tasks */}
                <div className="flex flex-col gap-y-[20px] mt-[50px]">
                    {
                        displayAllTask && taskData.length >= 1 && content
                    }
                </div>


            </div>

            <button className=' my-[20px] w-[100px] ml-[180px] hover:from-green-800 hover:to-green-800 rounded-md py-[10px] bg-gradient-to-r from-[#64c5a8] to-[#0b976d]' onClick={handleClear}>Clear</button>
        </section>
    )
};



export default TaskManager;