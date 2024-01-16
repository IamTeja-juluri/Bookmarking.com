const {StatusCodes}=require('http-status-codes')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserService }=require('../services')
const {User,Token} = require("../models")
const {SuccessResponse,ErrorResponse, SendEmail}=require('../utils/common')
const AppError = require('../utils/errors/app-error')
const { ServerConfig }=require('../config')
const crypto = require("crypto")

// Generate Token
const generateToken = (id) =>{
    return jwt.sign({id},ServerConfig.JWT_SECRET,{expiresIn:"1d"})
  }

async function createUser(req,res){

    try{
        const {name,email,password,confirmPassword,phone} = req.body
        const userExists= await User.findOne({email})
        if(userExists)
            throw new AppError(`User with email ${email} is already in use`,StatusCodes.CONFLICT);
        const phoneNumberExists = await User.findOne({phone});
        if(phoneNumberExists && phoneNumberExists.phone === phone)
            throw new AppError(`User with mobileNumber ${phone} is already in use`,StatusCodes.CONFLICT);
        if(password !== confirmPassword)
           throw new Error('Passwords do not match',StatusCodes.BAD_REQUEST);
        const user = await UserService.createUser({name,email,password,phone});
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
        if(!user)
            throw new AppError(`User with ${email} doesnt exist,please sign in`,StatusCodes.BAD_REQUEST);
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect)
            throw new AppError(`Wrong Password,Please try again`,StatusCodes.BAD_REQUEST);
        const token = generateToken(user._id);
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


async function forgotPassword(req,res){

    try{
    
        const {email} = req.body
        const user = await User.findOne({email})

        if(!user)
            throw new AppError(`User with ${email} doesn't exist,please provide valid email`,StatusCodes.NOT_FOUND);

        let token = await Token.findOne({userId:user._id})

        // delete if there is any token exists already
        if(token)
            await token.deleteOne()

        // create reset token 
        let resetToken = crypto.randomBytes(32).toString("hex") + user._id

        // Hash Token before saving
        const hashedToken = crypto.
                                    createHash("sha256").
                                    update(resetToken).
                                    digest("hex")
        
         // Save Token to DB
        await new Token({
            userId : user._id,
            token : hashedToken,
            createdAt : Date.now(),
            expiresAt : Date.now() + 30*60*1000
        }).save()

          // construct reset url
        const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

        // construct reset url
        const message =`
        <h2>Hello ${user.name}</h2>
        <p>You requested for a password reset</p>
        <p>Click on the link below to change your password</p>
        <p>The reset link is valid only for 30 minutes</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Regards.....</p>
        <p>Bookmarking.com Team</p> 
        `

        const subject = "Password Reset Request"
        const sendTo = user.email
        const sendFrom = process.env.EMAIL_USER
        await SendEmail(subject,message,sendTo,sendFrom)

        SuccessResponse.data = "Reset email sent"
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse);    
    }catch(error){
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}


module.exports={createUser,loginUser,logout,forgotPassword}