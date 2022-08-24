import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <div className="title">
                    <h1>CodeBlogs</h1>
                </div>

                <div className="btns">
                    <div className="blogs">
                        <div className="write">
                            <a href="#">Write Blog</a>
                        </div>
                        <div className="profile">
                            <button>My Profile</button>
                        </div>
                    </div>

                    <div className="accessBtn">
                        <div className="access">
                            <div className="log">
                                <a href="/login">Login</a>
                            </div>
                            <div className="reg">
                                <a href="/signup">Register</a>
                            </div>
                        </div>
                        <div className="denied">
                            <a href="/">Logout</a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar