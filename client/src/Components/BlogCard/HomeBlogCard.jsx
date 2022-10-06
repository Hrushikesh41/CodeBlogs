import React from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import "./BlogCard.css"

const HomeBlogCard = ({ blogContent }) => {

    const navigate = useNavigate();

    const redirectBlog = (elem) => {
        const redirect = navigate(`/blog/${elem}`, { replace: true })
    }
    return (
        <>
            <div className="blog_container">
                <div className="blog_app">
                    <div className="image">
                        <img src={blogContent.imageURL} alt="Loading..." />
                    </div>

                    <div className="blog_content">
                        <div className="heading">
                            <h1>{blogContent.title}</h1>
                        </div>
                        <div>
                            <div className="redirect" onClick={() => { redirectBlog(blogContent.slugifiedTitle)}}> Read More . . .</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HomeBlogCard;