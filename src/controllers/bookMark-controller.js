const {StatusCodes}=require('http-status-codes');
const { BookMarkService }=require('../services');
const {BookMark} = require("../models")
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function createBookMark(req,res){
    try{
        if(!req.user)
            throw new AppError(`Please login to create a bookmark`,StatusCodes.BAD_REQUEST)
        const authorName=req.user.name
        const userId = req.user._id
        const {link,collectionName,bookMarkName,bookmarkType,category,photo} = req.body
        const bookmarkAlreadyExists = await BookMark.findOne({link});
        if(bookmarkAlreadyExists && bookmarkAlreadyExists.link === link && bookmarkAlreadyExists.bookMarkType == "Public")
            throw new AppError(`Bookmark already exists with name ${bookmarkAlreadyExists.bookMarkName}`,StatusCodes.CONFLICT)
        const bookMark = await BookMarkService.createBookMark({
            userId,authorName,link,collectionName,bookMarkName,bookmarkType,category,photo
        });
        SuccessResponse.data=bookMark;
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

async function getLatestBookmarks(req,res){

    try{
        const bookmarks = await BookMarkService.getLatestBookmarks(req.query)
        SuccessResponse.data = bookmarks
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

async function getAnyBookmarksByQuery(req,res){
    try{
        return res
                  .status(StatusCodes.OK)
                  .json(res.paginatedResults)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}


async function updateBookmark(req,res){
    try{
        const bookmark = await BookMarkService.getBookmarks(req.query)
        const newBookmark = {...bookmark , ...req.body};
        if(bookmark.userId !== req.user._id)
            throw new Error("You are not authorised to perform this action",StatusCodes.UNAUTHORIZED)
        await newBookmark.save()
        SuccessResponse.data = "BookMark Updated Successfully"
        return res
                  .status(StatusCodes.OK)
                  .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}

module.exports={createBookMark,getAnyBookmarksByQuery,getLatestBookmarks,updateBookmark}