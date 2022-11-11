const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
require("./db/conn");
const userModels = require("./models/user.models")
const blogModel = require("./models/blogs.model")
const router = require("express").Router();
const serverless = require("serverless-http");
const nodemailer = require("nodemailer");

const app = express();

// app.use(cors())


// res.header("Access-Control-Allow-Origin", "*");
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     next();
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// app.use(cors({
//     origin: ["http://localhost:3000", "http://localhost:5173", "https://codeblogshrushikesh.netlify.app/", "*"],
//     methods: ["GET", "POST"],
//     credentials: true
// }))


app.use(express.json());
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 3001;

router.post("/addblog", async (req,res)=>{
    const {title, imageURL, blog, slug, id} = req.body;
    let slugifiedTitle = slug
    let likes = 0;

    if(!title  || !blog){
        return res.status(404).json({error : "Please Enter Title and Blog Content Fields"})
    }else{
        try {
            const user = await userModel.findOneAndUpdate({_id : id}, {$push : {"blogs" : [title]}});

            const CreadtedBy = await user.name;
            const upload = new blogModel({title, imageURL, blog, slugifiedTitle, likes, CreadtedBy});
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
});

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
            const result = await blogModel.findOne({slugifiedTitle: slug});

            return res.status(200).json({blogDetails : result})
        }

    } catch (error) {
        return res.status(500).json({error: "Something Went Wrong"})
    }
});

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

router.get("/", (req, res) => {
    res.send("Hello Bloggers")
});

router.post("/loguser", async (req, res)=>{
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(500).json({error : "Please Enter All Required Feilds"})
    }else{
        try {
            const fetchUser = await userModels.findOne({email:email});

            if(fetchUser){
                const fetchpass = await bcrypt.compare(password, fetchUser.password)
                const id = fetchUser._id
                if(fetchpass){
                    const token = await fetchUser.generateAuthToken();
                    return res.status(200).json({message : "Login Successful", token, id})
                }else{
                    return res.status(404).json({error : "invalid Password"})
                }
            }else{
                return res.status(404).json({error : "No User Found !!! Please Create an Account"})
            }
        } catch (error) {
            console.log(error);
        }
    }
});

const emailDetails = {
    to : "",
    from : "hkokardekar@gmail.com"
}

var pin = 0;

const userDetais = {
    name : "",
    email : "",
    password : ""
}

router.post("/addblogger", async(req, res)=>{
    const {name , email, password} = req.body;

    userDetais.name = name;
    userDetais.email = email;
    userDetais.password = password;
    const otp = Math.floor(1000 + Math.random()*9000);

    pin=otp;

    emailDetails.to = email;

    if(!name || !email || !password){
        return res.status(422).json({error : "Please add Required Fields"});
    }else{
        try{
            const fetchUser = await userModels.findOne({ email:email });

            if(fetchUser){
                return res.status(500).json({error : "User Already Registered"});
            }
            else{
                const transporter = nodemailer.createTransport({
                    service : "gmail",
                    auth : {
                        user : emailDetails.from,
                        pass : process.env.PASSWORD
                    }
                })

                const mailOPtion = {
                    from : emailDetails.from,
                    to : emailDetails.to,
                    subject : "Confirm Your Email",
                    html : `<h3> OTP to verify your email is ${otp}`
                }

                transporter.sendMail(mailOPtion, (error, info)=>{
                   return error ? console.log(error) :  res.status(200).json({message : "OTP Sent to Your Email"});
                })
            }

        }catch(err){
            console.log(err);
        }
    }
});

router.post("/verifyotp", (req, res)=>{
    const verifyPin = req.body;

    if(pin != verifyPin.otp){
        return res.status(500).json({error : "Invalid OTP"})
    }else{
        const name = userDetais.name;
        const email = userDetais.email;
        const password = userDetais.password;

        var blogger = new userModels({name, email, password});
        var result = blogger.save();

        if(result){
            const transporter = nodemailer.createTransport({
                service : "gmail",
                auth : {
                    user : emailDetails.from,
                    pass : process.env.PASSWORD
                }
            })

            const mailOPtion = {
                from : emailDetails.from,
                to : emailDetails.to,
                subject : "Confirm Your Email",
                html : `<h3> Email Verified Successfully</h3>`
            }

            transporter.sendMail(mailOPtion, (error, info)=>{
                if(error){
                    console.log(error);
                }else{
                    return res.status(200).json({message : "Follow Up Email Sent"})
                }
            })
            return res.status(200).json({message : "Registration Complete"});
        }else{
            return res.status(422).json({error : "Some Error Occurred"})
        }
    }
});

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

router.post("/updatepassword", (req, res) => {
    const email = req.body.email;
    
    if (!email) {
        return res.status(404).json({ error: "Please Enter Email" })
    } else {
        const otp = Math.floor(1000 + Math.random() * 9000);
        pin = otp;
        
        emailDetails.to = email;

        console.log(emailDetails.to);
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: emailDetails.from,
                    pass: process.env.PASSWORD
                }
            })

            const mailOPtion = {
                from: emailDetails.from,
                to: emailDetails.to,
                subject: "Confirm Your Email",
                html: `<h3> OTP to verify your email is ${otp}`
            }

            transporter.sendMail(mailOPtion, (error, info) => {
                return error ? console.log(error) : res.status(200).json({ message: "OTP Sent to Your Email" });
            })

        } catch (error) {
            console.log(error);
        }
    }

})

router.post("/verifycode", async (req, res) => {
    const otp = req.body.otp;
    console.log(otp);

    if (!otp) {
        return res.status(404).json({ error: "Please Enter all Fields" })
    } else {
        try {
            if (pin != otp) {
                return res.status(520).json({ error: "Invalid OTP" })
            } else {
                return res.status(200).json({ message: "OTP Verified" })
            }
        } catch (error) {
            console.log(error);
        }
    }

});

router.post("/newpassword", async(req, res)=>{
    const password = req.body.password;

    if(!password){
        return res.status(404).json({error : "Enter New Password"})
    }else{
        try {
            const email = emailDetails.to;
            const fetchEmail = await user.findOne({ email: email });
            console.log(fetchEmail)

            if (fetchEmail) {
                const hashPass = await bcrypt.hash(password, 12);
                const update = await user.findOneAndUpdate({ email: email }, { password:hashPass }, { new: true });
                const result = await update.save();

                if (result) {
                    return res.status(200).json({ message: "Password Changed Successfully" });
                } else {
                    return res.status(500).json({ error: "Some Error Ocuurred" })
                }
            } else {
                return res.status(404).json({ error: "Email not Found" })
            }
        } catch (error) {
            console.log(error);
        }
    }
})

app.use(`/.netlify/functions/api`, router);
module.exports = app
module.exports.handler = serverless(app)