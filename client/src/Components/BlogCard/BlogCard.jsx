import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BlogCard.css"

const BlogCard = ({ blogContent }) => {

    const navigate = useNavigate();

    const redirectBlog = (elem) => {
        navigate(`/blog/${elem}`, { replace: true })
    }
    return (
        <>
            <div className="blog_container" onClick={() => { redirectBlog(blogContent.slugifiedTitle) }}>
                <div className="blog_app">
                    <div className="image">
                        <img src={blogContent.imageURL} alt="Loading..." />
                    </div>

                    <div className="blog_content">
                        <div className="heading">
                            <h1>{blogContent.title}</h1>
                        </div>
                        <div className="blog">
                            <div className="content">{blogContent.blog}</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default BlogCard;