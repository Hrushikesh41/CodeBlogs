import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import storage from "../../firebase";
import "./AddBlogs.css"
import slugify from "slugify";
import Navbar from "../../Components/Headers/Navbar";
import url from "../../domain";

const AddBlogs = () => {
    const [progress, setProgress] = useState(0);
    var token;
    var id;

    const [blogDetails, setBlogDetails] = useState({
        title: "",
        imageURL: "",
        blog: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        token = localStorage.getItem("token");
        !token ? navigate("/login", { replace: true }) : id = localStorage.getItem("ID");
    })

    const handleChange = (e) => {
        setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value })
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target[2].files[0];
        uploafFile(file)
    }

    const uploafFile = (file) => {
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const upload = uploadBytesResumable(storageRef, file);

        console.log(upload);

        upload.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(prog)
            },
            (error) => { console.log(error); },
            () => {
                try {
                    getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                        setBlogDetails((prev) => { return { ...prev, imageURL: downloadURL } })
                        // blogDetails.imageURL !== "" && uploadBlog();
                        return downloadURL !== null ? Promise.resolve(downloadURL) : Promise.reject(false)
                    }).then((value) => {
                        console.log(value)
                        value ? uploadBlog(value) : console.log("not uploaded")
                    })
                } catch (error) {
                    console.log(error)
                } finally {
                    console.log(blogDetails.imageURL)
                }
            },
        )
    }

    // console.log(blogDetails.imageURL);

    const uploadBlog = (imageUrl) => {

        const title = blogDetails.title;
        const imageURL = imageUrl;
        const blog = blogDetails.blog;
        const slug = slugify(title, {
            lower: true
        })


        console.log(imageURL);

        fetch(`${url}.netlify/functions/api/addblog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, imageURL, blog, slug, id
            })
        }).then((res) => {
            console.log(res.status)
            if (res.status === 200) {
                navigate(`/blog/${slug}`, { replace: true })

            } else if (res.status === 404) {
                alert("Please Enter title and Blog Content")
            } else {
                alert("Something Went Wrong")
            }
            return res.json()
        }).then((data) => {
            console.log(data)
        })
        // const result =  res.json;
        // const status = res.status;
        // console.log(status)
    }

    const handleRedirect = () => {
        navigate("/", { replace: true })
    }

    return (
        <>
            <Navbar />
            <div className="home">
                <h1>Write Blogs</h1>
                <i className="fa fa-2x fa-home" onClick={handleRedirect}></i>
            </div>

            <div className="addBlog">
                <form onSubmit={handleUpload}>

                    <label htmlFor="title">Title<sup>*</sup></label>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="title"
                    />
                    <label htmlFor="desc">Description <sup>*</sup></label>

                    <textarea
                        rows="10"
                        cols="10"
                        name="blog"
                        onChange={handleChange}
                    ></textarea>

                    <label htmlFor="image" id="uploadLabel">Cover Image  <sup>*</sup></label>
                    <input
                        type="file"
                        accept="image/*"
                        id="image"
                        style={{ display: 'none' }}
                    />

                    <button>Upload</button>
                </form>
            </div>

            {progress === 0 ? null : (
                <div className="upload_bar">
                    <div className="upload_bar_status">
                        <div className="upload_bar_status_2" style={{ width: `${progress}%` }}></div>
                    </div>
                    <h3>Upload Done: {progress}%</h3>
                </div>
            )}

            {progress === 100 ?
                <div>
                    <img src={blogDetails.imageURL} alt="loading..." />
                </div> : null}
        </>
    )
}

export default AddBlogs