import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BlogCard.css"

const BlogCard = ({ blogContent }) => {

    const navigate = useNavigate();
    const [likes, setLikes] = useState(0);
    const [className , setClassName] = useState(false);

    const sendLikes = ()=>{
        setClassName((prev)=>{
            return !prev
        });

        if(className == false){
            setLikes(likes + 1);
        }else if(className == true){
            if(likes == 0){
                setLikes(likes)
            }else{
                setLikes(likes-1)
            }
        }
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
                        <div className="blog">
                            <div className="content">{blogContent.blog}</div>
                        </div>
                    </div>

                </div>

                <div className="reactions">
                        <i class="fa fa-2x fa-heart-o" onClick={sendLikes} style={className === true ? {color:"red"} : {}}></i>
                        <div className="likes">
                            {likes}
                        </div>
                    </div>
            </div>
        </>
    )
}

export default BlogCard;