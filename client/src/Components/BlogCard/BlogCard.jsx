import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({blogContent})=>{
    const navigate = useNavigate();

    const redirectBlog = (elem)=>{
        navigate(`/blog/${elem}`, {replace:true})
    }
    return(
        <>
            <div className="blog_container" onClick={()=>{redirectBlog(blogContent.slugifiedTitle)}}>
                <img src={blogContent.imageURL} alt="Loading..." />

                <div className="blog_content">
                    <div className="heading">
                        <h1>{blogContent.title}</h1>
                    </div>
                    <div className="blog">
                        <div className="content">{blogContent.blog}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard;