import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Headers/Navbar"
import "./UpdatePassword.css"

const UpdatePassword = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/", { replace: true })
        }
    })

    return (
        <>
            <Navbar />
            <div className="update">
                <div className="inner_div">
                    <h1>Update Password</h1>
                    <input
                        type='text'
                        placeholder="Enter Your Email"
                    />

                    <button>Send Otp</button>
                </div>
            </div>

        </>
    )
}

export default UpdatePassword