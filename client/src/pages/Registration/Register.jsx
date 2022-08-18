import react, { useState } from "react";
import { IoIosRocket } from "react-icons/io"
import "./Register.css"
import bg1 from "../../assets/bg1.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {

   const [details , setDetails] = useState({
    name : "",
    email : "",
    password : "",
    cpass : ""
   })

    const handleChange = (e)=>{
        setDetails({...details, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Button Clicked");

        if(details.name == "" || details.email == "" || details.password == "" || details.cpass == ""){
            toast.error('Plaese Enter all Fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else if(details.password.length <6 || details.cpass.length < 6){
            toast.error('Password Should Have atleast 6 Characters !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (details.password != details.cpass) {
            toast.error('Both Password Did not Match !!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else{
            toast('🦄 Wow so easy!', {
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
    return (
        <>
         <ToastContainer />

            <div className="container">

                <div className="left_inner_container">

                    <div className="user_inputs">
                        <h1>Create an Account</h1>

                        <form className="form_inputs" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                            />

                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="Enter Your Email"
                            />

                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Enter Your Password"
                            />

                            <input
                                type="password"
                                name="cpass"
                                onChange={handleChange}
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