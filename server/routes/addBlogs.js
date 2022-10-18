const express = require("express");
const dotenv = require("dotenv");
const blogModel = require("../models/blogs.model")
const userModel = require("../models/user.models");

const router = express.Router();

router.post("/addblog", async (req,res)=>{
    const {title, imageURL, blog, slug, id} = req.body;
    let slugifiedTitle = slug
    console.log(slugifiedTitle);
    let likes = 0;

    if(!title  || !blog){
        return res.status(404).json({error : "Please Enter Title and Blog Content Fields"})
    }else{
        try {
            const user = await userModel.findOneAndUpdate({_id : id}, {$push : {"blogs" : [title]}})
            const upload = new blogModel({title, imageURL, blog, slugifiedTitle, likes});
            var result = await upload.save();

            if(!result){
                res.json({
                    message: "Some error occurred while adding a new blog! 🔴 ",
                  });
            }else{
                return res.status(200).json({message : "Blog Added"})
            }
            
                
        } catch (error) {
            return res.status(500).json({error : "Something Went Wrong"})
        }
    }
})

module.exports = router