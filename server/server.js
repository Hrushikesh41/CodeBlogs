const express = require("express");
const dotenv = require("dotenv");
require("./db/conn");
const userModels = require("./models/user.models")

const app = express();
app.use(express.json());
dotenv.config({path : "config.env"});

const PORT = process.env.PORT || 3001;

app.use(require("./routes/register"));
app.use(require("./routes/login"))

app.post("/", (req, res)=>{
    res.send("Hello Bloggers")
});

app.listen(PORT, ()=>{
    console.log("APP LISTENING AT PORT : " + PORT);
})