const express = require("express");
const userModel = require("../models/user.models");
const blogModel = require("../models/blogs.model")

const router = express.Router();

router.post("/userblogs", async (req, res)=>{
    const id = req.body.id;
    const createdby = req.body.createdby;

    if(!id){
        return res.status(404).json({error : "Pleae Enter ID"})
    }
    else{
        try {
            const blog = await blogModel.find({CreadtedBy:createdby});
            const user = await userModel.findOne({_id:id})
            const name = user.name;
            const email = user.email;
            const blogsTitle = await blog;

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