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

userSchema.pre("save", async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }

    next();
})

const userModels = new mongoose.model("BLOGGERS", userSchema);

module.exports = userModels