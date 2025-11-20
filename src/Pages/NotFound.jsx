import React from 'react'
import IconButton from "../Components/IconButton";
import {FiHome} from "react-icons/fi";
import {useNavigate} from "react-router";

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="dark:bg-primary">
            <div className="flex flex-col w-full h-screen items-center justify-center gap-4">
                <img src="assets/images/404.png" alt="Page Not Found" className="w-1/3"/>
                <h1 className="font-semibold text-3xl text-center text-black dark:text-white">Content Not Available. Please Try Again Later.</h1>
                <IconButton icon={<FiHome  />} text={"Return to Home Page"} onClick={() => {navigate("/")}}/>
            </div>
        </div>
    )
}

export default NotFound
