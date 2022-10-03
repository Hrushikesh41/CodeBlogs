const express = require("express");
const blogModel = require("../models/blogs.model");

const router = express.Router();

var blogs 

router.get("/getblog", async (req, res)=>{
    blogs = 10;

    try{
        const getBlogs = await blogModel.find().limit(blogs);
        res.status(200).json({blogsData : getBlogs})
    }catch(error){
        console.log(error);
        res.status(500).json({error : "Cannot Find Blogs"})
    }

});

router.post("/getblogbyid", async (req, res)=>{
    const {slug} = req.body;

    try {
        if(!slug){
            return res.status(404).json({error : "Slug Not Found"})
        }else{
            console.log(slug);
            const result = await blogModel.findOne({slugifiedTitle: slug});

            return res.status(200).json({blogDetails : result})
        }

    } catch (error) {
        return res.status(500).json({error: "Something Went Wrong"})
    }
})

module.exports = router;