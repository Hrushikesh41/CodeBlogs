const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    }
});

const userModels = new mongoose.model("BLOGGERS", userSchema);

module.exports = userModels