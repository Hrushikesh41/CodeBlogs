import React, { useEffect, useState } from "react";
import BlogCard from "../../Components/BlogCard/BlogCard";

const BlogPage = ()=>{
    const [blogDetails, setBlogDetails] = useState([]);

    const getBlog = async()=>{
        const param = new URLSearchParams(window.location.search);
        const id = param.get("read");

        console.log(id);

        const res = await fetch("http://localhost:3000/getblogbyid", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                id
            })
        })

        const data = await res.json();
        console.log(data.blogDetails.title);

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

    useEffect(()=>{
        getBlog();
    }, [])


    return(
        <>
            <BlogCard blogContent={blogDetails} />
        </>
    )
}

export default BlogPage