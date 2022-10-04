import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

    const [auth, setAuth] = useState();
    const navigate = useNavigate();
    const [showUser, setShowUser] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token")
        console.log(token);
        token ? setAuth(false) : setAuth(true)
    }, []);

    const handleChange = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("ID")
    }

    const handleSetShow = ()=>{
        setShowUser((prev)=>{
            return !prev
        })
    }

    return (
        <>
            <div className="navbar">
                <div className="title" onClick={() => { navigate("/", { replace: true }) }}>
                    <h1>CodeBlogs</h1>
                </div>

                <div className="btns">
                    <div className="blogs">
                        <div className="write">
                            <a href="/write">Write Blog</a>
                        </div>
                    </div>

                    <div className="accessBtn">
                        {auth ? <>
                            <div className="access">
                                <div className="log">
                                    <a href="/login">Login</a>
                                </div>
                                <div className="reg">
                                    <a href="/signup">Register</a>
                                </div>
                            </div>
                        </> : <>
                            <div className="denied">
                                <a href="/login" onClick={handleChange}>Logout</a>
                            </div>
                            <div className="user">
                                <i class="fa fa-3x fa-user-circle-o" onClick={handleSetShow}></i>
                            </div>
                        </>}

                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar