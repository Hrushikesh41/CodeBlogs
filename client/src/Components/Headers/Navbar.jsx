import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

    const [auth, setAuth] = useState();
    const navigate = useNavigate();
    const [showUser, setShowUser] = useState(false);

    const mobileNav = useRef(null)
    const mobileNavOptions = useRef(null)
    const hamburger = useRef(null)

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

        navigate("/profile", {replace : true})
    }

    function handleMobileNav() {
        mobileNavOptions.current.style.display == "none" ? mobileNavOptions.current.style = "display: flex;" : mobileNavOptions.current.style.display = "none"
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
                                <i className="fa fa-3x fa-user-circle-o" onClick={handleSetShow}></i>
                            </div>
                        </>}

                    </div>
                </div>

                <div className="mobile_btns" ref={mobileNav}>
                    <div className="hamburger" ref={hamburger} onClick={handleMobileNav}><i className="fa-solid fa-bars"></i></div>
                    <div className="options" style={{display: 'none'}} ref={mobileNavOptions}>
                        <div className="menuCloseBtn" onClick={handleMobileNav}><i className="fa-solid fa-xmark"></i></div>
                        <div className="mobile_ctas">
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
                                        <i className="fa fa-3x fa-user-circle-o" onClick={handleSetShow}></i>
                                    </div>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar