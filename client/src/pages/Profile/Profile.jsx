import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import BlogCard from "../../Components/BlogCard/BlogCard";
import "./Profile.css"
import Navbar from "../../Components/Headers/Navbar";

const Profile = () => {
    var token;
    var id;

    const [details, setDetails] = useState({
        name: "",
        email: ""
    })

    const [title, setTilte] = useState([]);

    const navigate = useNavigate()

    const getUserBlogs = async (id) => {

        const res = await fetch("http://localhost:3000/userblogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        });

        const blogData = await res.json();
        console.log(blogData);

        setDetails({
            name: blogData.name,
            email: blogData.email
        })

        const blogTitle = blogData.blogTitle;
        setTilte(blogTitle);
    }

    useEffect(() => {
        token = localStorage.getItem("token");
        id = localStorage.getItem("ID");
        // setUserId(localStorage.getItem("ID"))

        if (!token) {
            navigate("/login", { replace: true })
        }
        getUserBlogs(id);
    }, []);
    localStorage.setItem("Blog Title", title);

    const handleRedirect = () => {
        navigate("/", { replace: true })
    }

    return (
        <>
            <Navbar />
            <div className="redirectHome">
                <i class="fa fa-2x fa-home" onClick={handleRedirect}></i>
            </div>
            <h2 className="profileHeading">Welcome 👋</h2>
            <h1 className="profileHeading"> {details.name}</h1>
            <p className="email">{details.email}</p>
            <h2 className="profile">Your Blogs : </h2>
            <div className="parent_app">
                <div className="parent">
                    {
                        title.length !== 0 && title.map((element, key) => {
                            return (
                                <>

                                    <div className="blogHeading">{element}</div>
                                    <hr />


                                </>
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default Profile