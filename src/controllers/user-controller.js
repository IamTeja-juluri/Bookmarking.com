const {StatusCodes}=require('http-status-codes')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserService }=require('../services')
const {User} = require("../models")
const {SuccessResponse,ErrorResponse}=require('../utils/common')
const AppError = require('../utils/errors/app-error')
const { ServerConfig }=require('../config')


// Generate Token
const generateToken = (id) =>{
    return jwt.sign({id},ServerConfig.JWT_SECRET,{expiresIn:"1d"})
  }

async function createUser(req,res){

    try{
        const {name,email,password,photo,phone,bio} = req.body
        const userExists= await User.findOne({email})
        if(userExists)
            throw new AppError(`User with email ${email} is already in use`,StatusCodes.CONFLICT);
        const phoneNumberExists = await User.findOne({phone});
        console.log("xyz=",phoneNumberExists)
        if(phoneNumberExists && phoneNumberExists.phone === phone)
            throw new AppError(`User with mobileNumber ${phone} is already in use`,StatusCodes.CONFLICT);
        const user = await UserService.createUser({name,email,password,photo,phone,bio});
        const token = generateToken(user._id);
        res.cookie("token",token,{
            path:"/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000*24*60*60),
            sameSite: "none",
            secure: true
        });
        SuccessResponse.data=user;
       return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
              .status(error.statusCode)
              .json(ErrorResponse);  
    }

}

async function loginUser(req,res){

    try{
        const {email,password} = req.body
        const user= await User.findOne({email})
        console.log(user)
        if(!user)
            throw new AppError(`User with ${email} doesnt exist,please sign in`,StatusCodes.BAD_REQUEST);
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect)
            throw new AppError(`Wrong Password,Please try again`,StatusCodes.BAD_REQUEST);
        const token = generateToken(user._id);
        console.log(token)
        res.cookie("token",token,{
            path:"/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000*24*60*60),
            sameSite: "none",
            secure: true
        });
        // Create a new object with the "password" field excluded
        const sanitizedData = (({ password, ...rest }) => rest)(user._doc);
        SuccessResponse.data=sanitizedData;
        console.log(SuccessResponse)
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error;
        return res
              .status(error.statusCode)
              .json(ErrorResponse);  
    }
    
}

async function logout(req,res){
    try{
        res.cookie("token","",{
            path:"/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true
        });
        SuccessResponse.data="Successfully logged out"
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error;
        return res
              .status(error.statusCode)
              .json(ErrorResponse);  
    }
   
}

module.exports={createUser,loginUser,logout}