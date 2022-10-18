const express = require("express");
const blogModel = require("../models/blogs.model");

const router = express.Router();

router.post("/updatelikes", async(req, res)=>{
    const {id, likes, reactions} = req.body;
    
    let updateLikes ;

    if(likes == true){
        updateLikes = reactions + 1;
    }else{
        updateLikes = reactions - 1;
    }

    try {
        if(updateLikes < 0){
            return res.status(500).json({error: "Error Occurred in Updating likes"})
        }else{
            const update = await blogModel.findByIdAndUpdate({_id:id}, {likes:updateLikes}, {new:true});

            if(update){
                return res.status(200).json({message : "Likes Updated"})
            }else{
                return res.status(500).json({error: "Error Occurred"})
            }
        }
    } catch (error) {
        console.log(error);
    }
    
});

module.exports = router;