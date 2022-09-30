const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
    },
    blog : {
        type : String,
        required: true
    }
});

const blogModel = new mongoose.model("BLOGS", blogSchema);

module.exports = blogModel;