const {User} = require("../models")
const jwt = require("jsonwebtoken")
const AppError = require("../utils/errors/app-error")
const { StatusCodes } = require("http-status-codes")
const {ErrorResponse}=require('../utils/common')
const {ServerConfig} = require("../config")

const protect = async(req,res,next)=>{
   try{
        const token = req.headers.authorization.split(' ');
        if(!token)
            throw new AppError("Unauthorised,please login",StatusCodes.UNAUTHORIZED)
        const decoded = jwt.verify(token[1],ServerConfig.JWT_SECRET)
        const user = await User.findOne({_id:decoded.id}).select("-password")
        if(!user)
            throw new AppError("User Not found",StatusCodes.UNAUTHORIZED)
        req.user = user
        req.user.accessToken=token[1]
        console.log("ru=",req.user)
        next()
    }catch(error){
        ErrorResponse.error=error;
        return res.
              status(error.statusCode)
              .json(ErrorResponse);  
    }
}

module.exports=protect