const {StatusCodes}=require('http-status-codes');
const { CategoryService }=require('../services');
const {Category} = require("../models")
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function createCategory(req,res){
    try{
        const authorName=req.user.name
        const userId = req.user._id
        const {name,description,photo} = req.body
        const categoryAlreadyExists = await Category.findOne({ name: { $regex: new RegExp(req.body.name, 'i') } });
        if(categoryAlreadyExists)
            throw new AppError(`Category already exists with name ${categoryAlreadyExists.name}`,StatusCodes.CONFLICT)
        const category = await CategoryService.createCategory({
            userId,authorName,name,description,photo
        });
        SuccessResponse.data=category;
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

async function getAllCategories(req,res){
    try{
        const categories=await CategoryService.getAllCategories();
        return res
                  .status(StatusCodes.OK)
                  .json(categories);
    }catch(error){
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

async function searchCategories(req,res){
    try{
        const categories=await CategoryService.searchCategories(req);
        return res
                  .status(StatusCodes.OK)
                  .json(categories);
    }catch(error){
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

module.exports={
    createCategory,getAllCategories,searchCategories
}