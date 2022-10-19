import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import BlogCard from "../../Components/BlogCard/BlogCard";
import "./Profile.css"
import Navbar from "../../Components/Headers/Navbar";

const Profile = ()=>{
    var token;
    var id;

    const [details, setDetails] = useState({
        name:"",
        email : ""
    })

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
        
        setDetails({
            name : blogData.name,
            email : blogData.email
        })

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
        <Navbar />
            <h1>Welcome : {details.name}</h1>

            <h3></h3>
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