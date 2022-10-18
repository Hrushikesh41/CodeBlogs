import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import BlogCard from "../../Components/BlogCard/BlogCard";
import "./Profile.css"

const Profile = ()=>{
    var token;
    var id;

    const [title, setTilte] = useState([])
    // const [userId, setUserId] = useState("")

    const navigate = useNavigate()

    const getUserBlogs = async (id) => {
        // console.log(userId);
        
        const res = await fetch("http://localhost:3000/userblogs", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                id: id
            })
        });
    
        const blogData = await res.json();
        // console.log(blogData);
        const blogTitle = blogData.blogTitle;
        setTilte(blogTitle);
    }

    useEffect(()=>{
        token = localStorage.getItem("token");
        id = localStorage.getItem("ID");
        // setUserId(localStorage.getItem("ID"))
        console.log(id);
        
        if(!token){
            navigate("/login", {replace : true})
        }
        getUserBlogs(id);
    }, []);

    

    // useEffect(()=>{
    //     getUserBlogs();
    // });

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
                title.length !== 0 && title.map((element, key)=>{
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