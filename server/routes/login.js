const express = require("express");
require("../db/conn");
const userModels = require("../models/user.models");
const bcrypt = require('bcryptjs')

const router = express.Router();

router.post("/logblogger", async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(500).json({error : "Please Enter All Required Feilds"})
    }else{
        try {
            const fetchUser = await userModels.findOne({email:email})

            if(fetchUser){
                const fetchpass = await bcrypt.compare(password, fetchUser.password)
                const id = fetchUser._id

                if(fetchpass){
                    const token = await fetchUser.generateAuthToken();
                    return res.status(200).json({message : "Login Successful", token, id})
                }else{
                    return res.status(404).json({error : "invalid Password"})
                }
            }else{
                return res.status(404).json({error : "No User Found !!! Please Create an Account"})
            }
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;