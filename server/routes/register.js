const express = require('express');
require("../db/conn")
const userModels = require("../models/user.models");
const nodemailer = require("nodemailer")

const router = express.Router();

const emailDetails = {
    to : "",
    from : "hkokardekar@gmail.com"
}

var pin = 0;

const userDetais = {
    name : "",
    email : "",
    password : ""
}



router.post("/addblogger", async(req, res)=>{
    const {name , email, password} = req.body;

    userDetais.name = name;
    userDetais.email = email;
    userDetais.password = password;
    const otp = Math.floor(1000 + Math.random()*9000);

    pin=otp;

    emailDetails.to = email;

    if(!name || !email || !password){
        return res.status(422).json({error : "Please add Required Fields"});
    }else{
        try{
            const fetchUser = await userModels.findOne({ email:email });

            if(fetchUser){
                return res.status(500).json({error : "User Already Registered"});
            }
            else{
                const transporter = nodemailer.createTransport({
                    service : "gmail",
                    auth : {
                        user : emailDetails.from,
                        pass : process.env.PASSWORD
                    }
                })

                const mailOPtion = {
                    from : emailDetails.from,
                    to : emailDetails.to,
                    subject : "Confirm Your Email",
                    html : `<h3> OTP to verify your email is ${otp}`
                }

                transporter.sendMail(mailOPtion, (error, info)=>{
                   return error ? console.log(error) :  res.status(200).json({message : "OTP Sent to Your Email"});
                })
            }

        }catch(err){
            console.log(err);
        }
    }
});

router.post("/verifyotp", (req, res)=>{
    const verifyPin = req.body;

    if(pin != verifyPin.otp){
        return res.status(500).json({error : "Invalid OTP"})
    }else{
        const name = userDetais.name;
        const email = userDetais.email;
        const password = userDetais.password;

        var blogger = new userModels({name, email, password});
        var result = blogger.save();

        if(result){
            const transporter = nodemailer.createTransport({
                service : "gmail",
                auth : {
                    user : emailDetails.from,
                    pass : process.env.PASSWORD
                }
            })

            const mailOPtion = {
                from : emailDetails.from,
                to : emailDetails.to,
                subject : "Confirm Your Email",
                html : `<h3> Email Verified Successfully</h3>`
            }

            transporter.sendMail(mailOPtion, (error, info)=>{
                if(error){
                    console.log(error);
                }else{
                    return res.status(200).json({message : "Follow Up Email Sent"})
                }
            })
            return res.status(200).json({message : "Registration Complete"});
        }else{
            return res.status(422).json({error : "Some Error Occurred"})
        }
    }
})

module.exports = router;    