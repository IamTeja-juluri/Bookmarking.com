const { StatusCodes }=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.email){
        ErrorResponse.message='Something went wrong while creating a new state ';
        ErrorResponse.error= new AppError(['email not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.password){
        ErrorResponse.message='Something went wrong while creating a new state ';
        ErrorResponse.error= new AppError(['password not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    next();  //controller is the next middleware
};


function validateRegisterUser(req,res,next){
    if(!req.body.name){
        ErrorResponse.message='Something went wrong while creating a new state ';
        ErrorResponse.error= new AppError(['name not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    if(!req.body.phone){
        ErrorResponse.message='Something went wrong while creating a new state ';
        ErrorResponse.error= new AppError(['phone not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    validateCreateRequest(req,res,next);
}

module.exports={
    validateCreateRequest,validateRegisterUser
}