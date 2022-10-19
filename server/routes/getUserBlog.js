const express = require("express");
const userModel = require("../models/user.models");

const router = express.Router();

router.post("/userblogs", async (req, res)=>{
    const id = req.body.id;
    console.log(req.body);

    if(!id){
        return res.status(404).json({error : "Pleae Enter ID"})
    }
    else{
        try {
            const user = await userModel.findOne({_id: id});
            // console.log(user);
            const name = user.name;
            const email = user.email;
            const blogsTitle = await user.blogs

            if(user){
                return res.status(200).json({message : "Blogs Found", blogTitle : blogsTitle, name:name, email:email})
            }else{
                return res.status(500).json({error : "Error Occurred in fetching Blogs"})
            }
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router