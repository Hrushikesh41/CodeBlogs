import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Headers/Navbar"
import "./UpdatePassword.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import url from "../../domain";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/", { replace: true })
        }
    });

    const handleChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handleSubmit = async () => {

        if (email == undefined) {
            toast.error('Please Enter Email', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const res = await fetch(`${url.base}.netlify/functions/api/updatepassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });

            const result = await res.json();
            const status = res.status

            if (status == 200) {
                navigate("/auth", { replace: true })
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className="update">
                <div className="inner_div">
                    <h1>Update Password</h1>
                        <input
                            type='text'
                            onChange={handleChange}
                            autoComplete='off'
                            placeholder="Enter Your Email"
                        />

                        <button onClick={handleSubmit}>Send Otp</button>
                        <ToastContainer />
                </div>
            </div>

        </>
    )
}

export default UpdatePassword