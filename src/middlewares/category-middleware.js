const { StatusCodes }=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateCategory(req,res,next){


    if(!req.body.name){
        ErrorResponse.message='Something went wrong while creating a new category ';
        ErrorResponse.error= new AppError(['Category name not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.photo){
        ErrorResponse.message='Something went wrong while creating a new category ';
        ErrorResponse.error= new AppError(['Category photo not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.description){
        ErrorResponse.message='Something went wrong while creating a new category ';
        ErrorResponse.error= new AppError(['Category description not found in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    next();  //controller is the next middleware
};



module.exports={
    validateCreateCategory
}