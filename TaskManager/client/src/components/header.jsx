import {NavLink} from "react-router-dom";
import { FaMoon } from "react-icons/fa";

function Header({darkMode, setDarkMode})
{
    function setBackground()
    {
        setDarkMode((prevVal)=>{return !prevVal})
    }
    return (
        <header className="bg-gradient-to-r from-[rgb(170,183,184)] to-[rgb(44,62,80)] py-[10px] flex flex-row justify-end items-center pr-[100px]" >
            <ul className="list-none flex flex-row w-[250px] justify-between items-center">
                <li>
                    <NavLink
                        to="/"
                        className={({isActive})=>{
                            return isActive ? "text-white  text-[20px]" : "text-black text-[20px]"
                        }}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/task"
                        className={({isActive})=>{
                            return isActive ? "text-white text-[20px]" : "text-black text-[20px]"
                        }}
                    >
                        Tasks
                    </NavLink>
                </li>
                <li>
                    <FaMoon onClick={setBackground} className=""/>
                </li>
            </ul>
        </header>
    )
}

export default Header;