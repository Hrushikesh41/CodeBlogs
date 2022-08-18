import react from "react";
import { IoIosRocket } from "react-icons/io"
import "./Register.css"
import bg1 from "../../assets/bg1.jpg"

const Registration = () => {

    const handleSubmit = ()=>{
        console.log("Registered");
    }
    return (
        <>

            <div className="container">

                <div className="left_inner_container">

                    <div className="user_inputs">
                        <h1>Create an Account</h1>

                        <form className="form_inputs" onSubmit={handleSubmit}>
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

                            <div className="redirect">
                                <a href="/login">Already a Blogger</a>
                            </div>

                            <div className="submit_data">
                                <button type="submit">Register</button>
                            </div>
                        </form>
                    </div>


                </div>

                <div className="right_inner_container">
                    <img src={bg1} alt="Loading...." />
                </div>
            </div>
        </>
    )
}

export default Registration;