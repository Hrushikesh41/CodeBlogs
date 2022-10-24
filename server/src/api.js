const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
require("./db/conn");
const userModels = require("./models/user.models")
const blogModel = require("./models/blogs.model")
const router = require("express").Router();
const serverless = require("serverless-http");

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "*"],
    methods: ["GET", "POST"],
    credentials: true
}))


app.use(express.json());
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 3001;

app.use(require("./routes/register"));
app.use(require("./routes/login"));
app.use(require("./routes/UpdatePassword"));
app.use(require("./routes/addBlogs"));
app.use(require("./routes/getBlogs"));
app.use(require("./routes/getUserBlog"));
app.use(require("./routes/UpdateLikes"));

app.post("/", (req, res) => {
    res.send("Hello Bloggers")
});

app.use(`/.netlify/functions/api`, router);
module.exports = app
module.exports.handler = serverless(app)