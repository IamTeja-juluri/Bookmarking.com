const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required : [true, "Please add userId"]
    },
    name : {
        type : String,
        required : [true,"Please add the name"]
    },
    description : {
        type : String,
        required : [true,"Please add some description"]
    },
    photo : {
        type : String,
        required : [true,"Please add the photo for your category"],
        default : "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    authorName : {
        type : String ,
        default : "User"
    }
} ,{
    timestamps: true   //creates createdAt and updatedAt field
})


const Category = mongoose.model("Category",categorySchema);
module.exports=Category