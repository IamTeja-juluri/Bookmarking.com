const mongoose = require('mongoose')

const bookMarkSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required : [true, "Please add userId"]
    },
    link : {
        type : String,
        required : [true, "Please add your link"],
        trim : true // removes space in email
    },
    collectionName : {
        type : String,
        required : [true,"please provide the name for collection"],
        minLength : [2,"Password must be atleast 2 characters"],
        maxLength : [30,"Password cannot be more than 25 characters"]
    },
    bookMarkName : {
        type : String,
        required : [true,"please provide the name for your bookmark"],
    },
    bookmarkType : {
        type : String,
        required : [true,"Public or Private"]
    },
    category : {
        type : String,
        required : [true,"please provide the name for your bookmark"],
    },
    photo : {
        type : String,
        required : [true,"Please add the photo for your bookmark"],
        default : "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    authorName : {
        type : String ,
        default : "User"
    }
} ,{
    timestamps: true   //creates createdAt and updatedAt field
})



const BookMark = mongoose.model("BookMark",bookMarkSchema);
module.exports=BookMark