import HomePage from "./homePage";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import { useState } from "react";
import Header from "./components/header";
import TaskManager from "./components/tasksPage";
import { set } from "mongoose";

function App()
{
    const [darkModeNew, setDarkModeNew] = useState(false); 
    const darkBg = darkModeNew ? "dark" : "";
    console.log(`This is ${darkBg}`);
    return (
        <main className={`${darkBg}`}>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<div><Header darkMode={darkModeNew} setDarkMode={setDarkModeNew}/> <Outlet/> </div>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="task" element={<TaskManager/>}/>

                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    )
}
export default App;