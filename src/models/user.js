const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please add your name"]
    },
    email : {
        type : String,
        required : [true, "Please add your email"],
        unique : true,
        trim : true,  // removes space in email
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ] 
    },
    password : {
        type : String,
        required : [true,"please provide the password"],
        minLength : [6,"Password must be atleast 6 characters"],
        maxLength : [20,"Password cannot be more than 25 characters"]
    },
    photo : {
        type : String,
        required : [true,"Please add your photo"],
        default : "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone : {
        type : String,
        default : "+234",
        unique : true,
        trim : true
    },
    bio : {
        type : String ,
        maxLength : [250,"Bio cannot be more than 250 characters"],
        default : "bio"
    }
} ,{
    timestamps: true   //creates createdAt and updatedAt field
})


//hash password before saving to database
userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    next();
})


const User = mongoose.model("User",userSchema);
module.exports=User