const express = require('express');
require("../db/conn")
const userModels = require("../models/user.models");

const router = express.Router();

router.post("/addblogger", async(req, res)=>{
    const {name , email, password} = req.body;

    if(!name || !email || !password){
        return res.status(422).json({error : "Please add Required Fields"});
    }else{
        try{
            const fetchUser = await userModels.findOne({ email:email });

            if(fetchUser){
                return res.status(500).json({error : "User Already Registered"});
            }
            else{
                var blogger = new userModels({name, email, password})
                var result = await blogger.save();

                if(result){
                    return res.status(200).json({message : "Registration Successful"})
                }else{
                    return res.status(422).json({error : "Some Error Occurred"});
                }
            }

        }catch(err){
            console.log(err);
        }
    }
})

module.exports = router;    