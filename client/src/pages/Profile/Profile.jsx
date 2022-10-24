import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import BlogCard from "../../Components/BlogCard/BlogCard";
import "./Profile.css"
import Navbar from "../../Components/Headers/Navbar";

const Profile = () => {
    var token;
    var id;
    var CreadtedBy;

    const [details, setDetails] = useState({
        name: "",
        email: ""
    })

    const [title, setTilte] = useState([]);

    const navigate = useNavigate()

    const getUserBlogs = async (id, createdby) => {

        const res = await fetch("https://server--codeblog-server.netlify.app/.netlify/functions/api/userblogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id, createdby: createdby
            })
        });

        const blogData = await res.json();

        setDetails({
            name: blogData.name,
            email: blogData.email
        })

        const blogTitle = blogData.blogTitle;
        setTilte(blogTitle);
    }

    console.log(title);

    useEffect(() => {
        token = localStorage.getItem("token");
        id = localStorage.getItem("ID");
        CreadtedBy = localStorage.getItem("CreatedBy")

        // setUserId(localStorage.getItem("ID"))

        if (!token) {
            navigate("/login", { replace: true })
        }
        getUserBlogs(id, CreadtedBy);
    }, []);
    localStorage.setItem("Blog Title", title);

    const handleRedirect = () => {
        navigate("/", { replace: true })
    }

    const redirectBlog = (elem) => {
        const redirect = navigate(`/blog/${elem}`, { replace: true })
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
                        title.map((element, key) => {
                            return (
                                <>

                                    <div className="blogHeading">
                                        <div className="titleHead">
                                            <div className="title">
                                                {element.title}
                                            </div>
                                            <div className="redirect" onClick={() => { redirectBlog(element.slugifiedTitle) }}> Read More . . .</div>

                                        </div>

                                        <div className="reaction">
                                            <i class="fa fa-heart-o"></i> {element.likes}
                                        </div>
                                    </div>

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