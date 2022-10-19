const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true
    },
    blog : {
        type : String,
        required : true
    },
    slugifiedTitle : {
        type : String
    },
    likes : {
        type : Number
    },
    CreadtedBy : {
        type : String
    }
});

const blogModel = new mongoose.model("BLOGS", blogSchema);

module.exports = blogModel;