import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import BlogCard from "../../Components/BlogCard/BlogCard";
import "./Profile.css"

const Profile = ()=>{
    var token;
    var id;

    const [title, setTilte] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        token = localStorage.getItem("token");
        id = localStorage.getItem("ID");

        if(!token){
            navigate("/login", {replace : true})
        }
    }, []);

    const getUserBlogs = async ()=>{
        
        const res = await fetch("http://localhost:3000/userblogs", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                id
            })
        });
    
        const blogData = await res.json();
        const blogTitle = blogData.blogTitle;
        setTilte( blogTitle);
    }

    useEffect(()=>{
        getUserBlogs();
    }, []);

    console.log(title);
    localStorage.setItem("Blog Title", title)

    // const handleClick = ()=>{
    //     const allTitles = localStorage.getItem("Blog Title");

    //     const titles = allTitles.split(",");
        
    //     title.forEach((element)=>{
    //         element.forEach((elem)=>{
              
    //         })
    //     })
    // }

    return(
        <>
            <h1>Your Profile</h1>
            {
                title.map((element, key)=>{
                    return(
                        <>
                            <div>{element}</div>
                        </>
                    )
                })
            }
        </>
    )
}

export default Profile