function Tasks()
{

    const [viewAlltaskData, setViewAllTaskData] = React.useState({});
    const [createTasksForm, setCreateTasksForm] = React.useState({});



    return (
        <section>
            <div>
                <button>View Tasks</button>
                <button>View Tasks based on Id</button>
                <button>Create New Tasks</button>
                <button>Update Tasks Details</button>
                <button>Delete Task</button>
            </div>
        </section>
    )
}

/**
crud operations
create tasks
update taks
delete tasks  
view tasks

setups 3 routes
app.get() // view all tasks tasks
app.get(/:id) // view task based on id
app.post() // create tasks
app.put() // update tasks based on id
app.del() // delete tasks based on id
 */