const express = require("express");
require("../db/conn");
const user = require("../models/user.models");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer")

const router = express.Router();

const emailDetails = {
    to: "",
    from: "hkokardekar@gmail.com"
}

var pin = 0;

router.post("/updatepassword", (req, res) => {
    const email = req.body.email;
    
    if (!email) {
        return res.status(404).json({ error: "Please Enter Email" })
    } else {
        const otp = Math.floor(1000 + Math.random() * 9000);
        pin = otp;
        
        emailDetails.to = email;

        console.log(emailDetails.to);
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: emailDetails.from,
                    pass: process.env.PASSWORD
                }
            })

            const mailOPtion = {
                from: emailDetails.from,
                to: emailDetails.to,
                subject: "Confirm Your Email",
                html: `<h3> OTP to verify your email is ${otp}`
            }

            transporter.sendMail(mailOPtion, (error, info) => {
                return error ? console.log(error) : res.status(200).json({ message: "OTP Sent to Your Email" });
            })

        } catch (error) {
            console.log(error);
        }
    }

})

router.post("/verifycode", async (req, res) => {
    const otp = req.body.otp;
    console.log(otp);

    if (!otp) {
        return res.status(404).json({ error: "Please Enter all Fields" })
    } else {
        try {
            if (pin != otp) {
                return res.status(520).json({ error: "Invalid OTP" })
            } else {
                return res.status(200).json({ message: "OTP Verified" })
            }
        } catch (error) {
            console.log(error);
        }
    }

});

router.post("/newpassword", async(req, res)=>{
    const password = req.body.password;

    if(!password){
        return res.status(404).json({error : "Enter New Password"})
    }else{
        try {
            const email = emailDetails.to;
            const fetchEmail = await user.findOne({ email: email });
            console.log(fetchEmail)

            if (fetchEmail) {
                const hashPass = await bcrypt.hash(password, 12);
                const update = await user.findOneAndUpdate({ email: email }, { password:hashPass }, { new: true });
                const result = await update.save();

                if (result) {
                    return res.status(200).json({ message: "Password Changed Successfully" });
                } else {
                    return res.status(500).json({ error: "Some Error Ocuurred" })
                }
            } else {
                return res.status(404).json({ error: "Email not Found" })
            }
        } catch (error) {
            console.log(error);
        }
    }
})

module.exports = router