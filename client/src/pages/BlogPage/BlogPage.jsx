import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Navbar from "../../Components/Headers/Navbar"

const BlogPage = () => {
    const {slug} = useParams();
    const [blogDetails, setBlogDetails] = useState([]);
    
    console.log(slug);

    const getBlog = async () => {
        

        const res = await fetch("http://localhost:3000/getblogbyid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                slug
            })
        })

        const data = await res.json();
        console.log(data.blogDetails.title);

        const splitTitle = data.blogDetails.title.split(" ");

        console.log(splitTitle.splice(0, 2));


        setBlogDetails(data.blogDetails)
        console.log(blogDetails);

        // if(res.status===200){
        //     setBlogDetails(data)
        //     console.log(blogDetails);
        // }
        // else{
        //     console.log("Blog Not Found");
        // }
    }

    useEffect(() => {
        getBlog();
    }, [])


    return (
        <>
            <Navbar />
            <BlogCard blogContent={blogDetails} />
        </>
    )
}

export default BlogPage