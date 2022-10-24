import React, { useEffect, useState } from "react";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Navbar from "../../Components/Headers/Navbar";
import HomeBlogCard from "../../Components/BlogCard/HomeBlogCard";
import "./Dashboard.css"

const Dashboard = () => {
    const [blogDetails, setBlogDetails] = useState([]);

    const getBlogs = async () => {
        try {
            const res = await fetch("https://server--codeblog-server.netlify.app/.netlify/functions/api/getblog", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);
            if (res.status == 200) {
                setBlogDetails(data.blogsData);
                console.log(blogDetails);
            } else {
                console.log("Error Occurred");
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getBlogs()
    }, [])
    return (
        <>
            <Navbar />

            <div className="app">

                <form method="get">            
                        {blogDetails.length == 0 ? <>
                            <div className="notFound">
                                No Blogs to display
                            </div>
                        </> :
                            blogDetails.map((blogContent, key) => {
                                return (
                                    <HomeBlogCard blogContent={blogContent} key={key} />
                                )
                            })
                        }
                </form>
            </div>
        </>
    )
}

export default Dashboard