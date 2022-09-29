const express = require("express");
const dotenv = require("dotenv");

const router = express.Router();

router.post("/addblog", (req,res)=>{
    const {title, decription} = req.body;
})

module.exports = router