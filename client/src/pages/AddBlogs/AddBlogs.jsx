import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import storage from "../../firebase";

const AddBlogs = ()=>{
    const[progress, setProgress] = useState(0);
    
    const[imgUrl, setImgUrl] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");

        token ? null : navigate("/login", {replace:true})
    }, []);

    const handleUpload = async (e)=>{
        e.preventDefault();
        const file = e.target[0].files[0];
        uploafFile(file)
    }

    const uploafFile = (file) =>{
        if(!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const upload = uploadBytesResumable(storageRef, file);

        upload.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                   ( snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(prog)
            },
            (error) => {console.log(error);},
            ()=>{
                getDownloadURL(upload.snapshot.ref).then((downloadURL)=>{
                    console.log(downloadURL);
                    setImgUrl(downloadURL);
                })
            },
        )
    }

    return(
        <>
            <h1>Write Blogs</h1>

            <form onSubmit={handleUpload}>
            <input 
            type="file"
            accept="image/*"
            />

            <button>Upload</button>
            </form>

            {progress===0 ? null : (
                <div className="upload_bar">
                <div className="upload_bar_status">
                  <div className="upload_bar_status_2" style={{ width: `${progress}%` }}></div>
                </div>
                <h3>Upload Done: {progress}%</h3>
              </div>
            )}

            {progress===100 ? 
            <div>
                <img src={imgUrl} alt="loading..." />
            </div>: null}
        </>
    )
}

export default AddBlogs