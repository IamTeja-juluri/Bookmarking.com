const {UserRepository} = require("../repositories");
const {StatusCodes}=require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { data } = require("../utils/common/error-response");

const userRepository = new UserRepository();

async function createUser(data){
    try{
        const user = await userRepository.create(data);
        return user;
    }catch(error){
        throw new AppError('Cannot create a new user Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUser(){
    try{
        const user = await userRepository.get(data);
        if(!user)
            throw new AppError('No such user found', StatusCodes.NOT_FOUND);
        return user;
    }catch(error){
        throw new AppError('Cannot get user',StatusCodes.BAD_REQUEST)
    }
}


module.exports={
    createUser,getUser
}