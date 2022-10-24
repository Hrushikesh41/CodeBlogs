import React, { useState } from "react";
import "../Verify/Verify.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import otpImg from "../../assets/otp.png"

const VerifyOtp = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setOtp(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(otp);

        if (otp == "") {
            toast.error('Please Enter OTP', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const res = await fetch("https://server--codeblog-server.netlify.app/.netlify/functions/api/verifycode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    otp
                })
            })

            const result = await res.json();
            const status = res.status;

            console.log(result);

            if (status == 200) {
                navigate("/new", { replace: true });
            } else if (status == 500) {
                toast.error('Invalid OTP', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Some Error Occurred', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        }
    }

    return (
        <>
            <div className="app-content">
                <div className="image">
                    <img src={otpImg} alt="Loading..." />
                </div>
                <div className="verify-section">
                    <form method="post">

                        <div className="content">
                            <h2>Enter OTP Sent to your Email ID</h2>
                            <div className="otp-input">
                                <input
                                    type="number"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />

                                <button type=" submit" onClick={handleSubmit}>Verify</button>

                                <ToastContainer />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default VerifyOtp;