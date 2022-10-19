import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BlogCard.css"

const BlogCard = ({ blogContent }) => {

    const navigate = useNavigate();

    const { slug } = useParams();
    const [id, setID] = useState();
    const [reactions, setReaction] = useState();
    const [likes, setLikes] = useState(true);
    const [className, setClassName] = useState(false);

    const getBlogData = async () => {

        const res = await fetch("http://localhost:3000/getblogbyid", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                slug
            })
        });

        const data = await res.json();
        setID(data.blogDetails._id);
        setReaction(data.blogDetails.likes)

    }

    useEffect(() => {
        getBlogData();
    }, [])


    const updatedlikes = async () => {

        const res = await fetch("http://localhost:3000/updatelikes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id, likes, reactions
            })
        });
        const data = await res.json();
        console.log(data);
        getBlogData();
    }


    const sendLikes = async () => {
        setClassName((prev) => {
            return !prev
        });
    }

    const handleRedirect = () => {
        navigate("/", { replace: true })
    }

    return (
        <>
            <div className="redirectHome">
                <i class="fa fa-2x fa-home" onClick={handleRedirect}></i>
            </div>
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

                <div className="reactions" onClick={() => { setLikes(!likes); updatedlikes() }}>
                    <i class="fa fa-2x fa-heart-o" onClick={sendLikes} style={className === true ? { color: "red" } : {}}></i>
                    <div className="likes">
                        {reactions}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard;