import react from "react";
import { IoIosRocket } from "react-icons/io"
import "./Register.css"

const Registration = () => {
    return (
        <>

            <div className="container">

                <div className="left_inner_container">
                    
                    <h1>Welcome <IoIosRocket size={70} color='white'/></h1>
                    
                    <h3>You'rer just few steps away from becoming Blogger</h3>
                    <h3> Register at CodeBlogs and become a professional Tech Blogger</h3>

                    <div className="redirect">
                        <a href="/login">Already a Blogger</a>
                    </div>
                </div>

                <div className="right_inner_container">
                    <h1>Create an Account</h1>

                    <div className="user_inputs">
                        <form method="post" className="form_inputs">
                            <input
                            type="text"
                            placeholder="Enter Your Name"
                            />

                            <input 
                            type="email"
                            placeholder="Enter Your Email"
                            />

                            <input 
                            type="password"
                            placeholder="Enter Your Password"
                            />

                            <input 
                            type="password"
                            placeholder="Enter Your Password Again"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration;