const express = require("express");
const dotenv = require("dotenv");
require("./db/conn");

const app = express();
dotenv.config({path : "config.env"})

app.get("/", (req, res)=>{
    res.send("Hello Bloggers")
});

app.listen(process.env.PORT, ()=>{
    console.log("APP LISTENING AT PORT 3000");
})