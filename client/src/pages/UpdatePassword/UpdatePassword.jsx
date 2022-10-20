import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdatePassword = ()=>{
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");

        if(token){
            navigate("/", {replace : true})
        }
    })

    return(
        <>
            <h1>Update Password</h1> 
        </>
    )
}

export default UpdatePassword