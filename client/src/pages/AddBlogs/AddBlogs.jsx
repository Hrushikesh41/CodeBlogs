import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import storage from "../../firebase";
import "./AddBlogs.css"
import slugify from "slugify";

const AddBlogs = () => {
    const [progress, setProgress] = useState(0);

    const [blogDetails, setBlogDetails] = useState({
        title: "",
        imageURL: "",
        blog: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        token ? null : navigate("/login", { replace: true })
    }, []);

    const handleChange = (e)=>{
        setBlogDetails({...blogDetails, [e.target.name] : e.target.value})
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
                        setBlogDetails((prev)=> {return {...prev, imageURL:downloadURL}})
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

    const uploadBlog = (imageUrl)=>{

        

        const title = blogDetails.title;
        const imageURL = imageUrl;
        const blog = blogDetails.blog;
        const slug = slugify(title, {
            lower :true
        })


        console.log(imageURL);

        fetch("http://localhost:3000/addblog", {
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                title, imageURL, blog, slug
            })
        }).then((res) => {
            console.log(res.status)
            if(res.status===200){
                navigate("/", {replace:true})
                
            }else if(res.status===404){
                alert("Please Enter title and Blog Content")
            }else{
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

    return (
        <>
            <h1>Write Blogs</h1>

            <form onSubmit={handleUpload}>

                <label htmlFor="title">Title</label>
                <input 
                type="text" 
                onChange={handleChange}
                name="title"
                />

               <textarea 
               rows="10" 
               cols="10"
               name="blog"
               onChange={handleChange}
               ></textarea>

                <input
                    type="file"
                    accept="image/*"
                />

                <button>Upload</button>
            </form>

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