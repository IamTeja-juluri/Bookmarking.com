const {CategoryRepository} = require("../repositories");
const {StatusCodes}=require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const categoryRepository = new CategoryRepository();

async function createCategory(data){
    try{
        const category = await categoryRepository.create(data);
        return category;
    }catch(error){
        throw new AppError('Cannot create a new category Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCategories(){
    try{
        const categories = await categoryRepository.getAll();
        return categories;
    }catch(error){
        throw new AppError('Cannot find a new category Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createCategory,getCategories
}