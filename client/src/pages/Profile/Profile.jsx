import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import "./Profile.css"

const Profile = ()=>{
    var token;
    var id;

    const [title, setTilte] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        token = localStorage.getItem("token");
        id = localStorage.getItem("ID");

        console.log(id);

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
        console.log(blogData.blogTitle);
        const blogTitle = blogData.blogTitle;
        setTilte(title =>[...title, blogTitle]);
    }

    useEffect(()=>{
        getUserBlogs();
    }, []);

    console.log(title);

    return(
        <>
            <h1>Your Profile</h1>
            {title.map((element, key)=>{
                localStorage.setItem("Blog Title", element)
                return element.map((blog, key)=>{
                    return (
                    <>
                        <div>{blog}</div>
                    </>
                )
                })
            })}
        </>
    )
}

export default Profile