import React from "react";
import login_bg from "../../assets/login_bg.jpg";
import "./Login.css"

const Login = ()=>{
    return(
        <>
            <div className="app_container">
                <div className="left_container">
                    <img src={login_bg} alt="Loading..." className="bgImage"/>
                </div>

                <div className="right_container">
                    <div className="inner_container">
                        <p>Login Here</p>

                        <div className="inner_right_container">
                            <form className="form_container">

                                <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                autoComplete="off"
                                />

                                <input 
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                autoComplete="off"
                                />

                                <div className="redirect_blogger">
                                    <a href="/signup">Create An Account</a>
                                </div>

                                <div className="login_btn">
                                    <button className="btn">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login