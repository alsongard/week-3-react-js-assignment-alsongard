# Task Manager Application 🚀

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A modern task management application with full CRUD functionality, built with the MERN stack (MongoDB, Express, React, Node.js). Manage your tasks efficiently with a clean, responsive interface.

**Live Demo:** [https://my-tasks-project.vercel.app/](https://my-tasks-project.vercel.app/)  
**API Documentation:** [https://alson-task-api.vercel.app/](https://alson-task-api.vercel.app/)


## Features ✨

### Task Management
- ✅ Create new tasks with titles, descriptions, and status
- 📋 View all tasks in a clean, sortable list
- 🔍 View individual task details
- ✏️ Update existing tasks (mark as complete, edit details)
- 🗑️ Delete tasks with confirmation

### User Experience
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Instant updates with real-time feedback
- 🎨 Clean UI with Tailwind CSS styling
- 📦 Persistent storage using MongoDB
- 📊 Status tracking (todo, in progress, completed)

### API Endpoints
```
POST    /task     - Create new task
GET     /tasks     - Get all tasks
GET     /task/:id - Get single task by ID
PATCH   /task/:id - Update task by ID
DELETE  /task/:id - Delete task by ID
```

## Tech Stack 🛠️

| Component       | Technology |
|-----------------|------------|
| Frontend        | React 18 + Vite |
| Styling         | Tailwind CSS |
| State Management| React Hooks |
| Backend         | Node.js + Express |
| Database        | MongoDB (Mongoose ODM) |
| Deployment      | Vercel (Frontend + API) |
| API Testing     | Postman/Thunder Client |

## Installation & Setup 💻

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- Git

### Frontend Setup
```bash
# Clone repository
git clone https://github.com/alsongard/task-manager.git
cd task-manager/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
cd ../backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000" >> .env
echo "NODE_ENV:production" >> .env
echo "TASK_USER:username" >> .env 
echo "TASK_SECRET:mongo_connection_password" >> .env 
# Start server
npm start
```

## Environment Variables 🔐

Create a `.env` file in the backend directory with the following:

```
MONGODB_URI = "your_mongodb_connection_string"
PORT = 5000
```

## API Usage Examples 💬

### Create Task
```http
POST /task
Content-Type: application/json

{
    task_name: "Complete project",
    task_description: "Finish the frontend and backend",
    task_startDate: "",
    task_endDate: "",
    status: "upcoming/ongoing",
    priority: 1-10, 
    assignee: "Hohn",
}
```

### Get Task by ID
```http
GET /task/664b3a7e1d9a6f3e48a5c2d1
```

### Update Task
```http
PATCH /task/664b3a7e1d9a6f3e48a5c2d1
Content-Type: application/json

{
  "task_name": "Project Name"
}
```

## Project Structure 📂

```
task-manager/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── homePage.jsx/
│   │   ├── index.css/
│   │   ├── main.jsx/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   ├── .env
|   ├── public/
|       ├── index.html 
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```



## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements 👏

- MongoDB for flexible document storage
- Vite for lightning-fast development
- Tailwind CSS for utility-first styling
- Vercel for seamless deployment
- Power Learning Academy for the tutorial and Opportunity