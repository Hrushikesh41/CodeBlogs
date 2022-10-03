const express = require("express");
const dotenv = require("dotenv");
const blogModel = require("../models/blogs.model")

const router = express.Router();

router.post("/addblog", async (req,res)=>{
    const {title, imageURL, blog, slug} = req.body;
    let slugifiedTitle = slug
    console.log(slugifiedTitle);

    if(!title  || !blog){
        return res.status(404).json({error : "Please Enter Title and Blog Content Fields"})
    }else{
        try {
            const upload = new blogModel({title, imageURL, blog, slugifiedTitle});
            var result = await upload.save();
            console.log(result);

            if(!result){
                res.json({
                    message: "Some error occurred while adding a new blog! 🔴 ",
                  });
            }else{
                return res.status(200).json({message : "Blog Added"})
            }
            
                
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : "Something Went Wrong"})
        }
    }
})

module.exports = router