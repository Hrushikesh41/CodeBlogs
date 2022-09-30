const express = require("express");
const dotenv = require("dotenv");
const blogModel = require("../models/blogs.model")

const router = express.Router();

router.post("/addblog", async (req,res)=>{
    const {title, imageURL, blog} = req.body;

    if(!title  || !blog){
        return res.status(404).json({error : "Please Enter Title and Blog Content Fields"})
    }else{
        try {
            const result = new blogModel({title, imageURL, blog});
            await result.save()
            return res.status(200).json({message : "Blog Added"})
                
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : "Something Went Wrong"})
        }
    }
})

module.exports = router