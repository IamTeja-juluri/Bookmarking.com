const {BookMarkRepository} = require("../repositories");
const {StatusCodes}=require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const bookMarkRepository = new BookMarkRepository();

async function createBookMark(data){
    try{
        const bookmark = await bookMarkRepository.create(data);
        return bookmark;
    }catch(error){
        console.log("Got error",error);
        throw new AppError('Cannot create a new bookmark Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getBookmarks(data){
    try{
        const bookmarks = await bookMarkRepository.get(data); 
        const sanitizedDataArray = bookmarks.map(bookmark => {
            const { _id, userId, __v, ...rest } = bookmark._doc;
            return rest;
          });
        return sanitizedDataArray;
    }catch(error){
        throw new AppError('Cannot get all bookmarks',StatusCodes.BAD_REQUEST)
    }

}

module.exports={
    createBookMark,getBookmarks
}