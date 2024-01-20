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

function validateResetPassword(req,res,next){

    if(!req.body.newPassword){
        ErrorResponse.message='Something went wrong while resetting a new password ';
        ErrorResponse.error= new AppError(['New Password not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    if(!req.body.confirmNewPassword){
        ErrorResponse.message='Something went wrong while resetting a new password ';
        ErrorResponse.error= new AppError(['Confirm New Password not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }
    next();
}

function validatechangePassword(req,res,next){

    if(!req.body.oldPassword){
        ErrorResponse.message='Something went wrong while changing password';
        ErrorResponse.error= new AppError(['OldPassword not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    if(!req.body.newPassword){
        ErrorResponse.message='Something went wrong while changing password';
        ErrorResponse.error= new AppError(['NewPassword not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    if(!req.body.confirmNewPassword){
        ErrorResponse.message='Something went wrong while changing password';
        ErrorResponse.error= new AppError(['ConfirmNewPassword not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    if(req.body.newPassword !== req.body.confirmNewPassword){
        ErrorResponse.message='Something went wrong while changing password';
        ErrorResponse.error= new AppError(['NewPassword and ConfirmNewPassword are not matching'],StatusCodes.BAD_REQUEST);
        return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse);
    }

    next();
}

module.exports={
    validateCreateRequest,validateRegisterUser,validateResetPassword,validatechangePassword
}