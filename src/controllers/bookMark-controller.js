const {StatusCodes}=require('http-status-codes');
const { BookMarkService }=require('../services');
const {BookMark} = require("../models")
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { BookmarkCategories } = require('../utils/common/enums');
const { Model } = require('mongoose');


async function createBookMark(req,res){

    try{
        const authorName=req.user.name
        const {userId,link,collectionName,bookMarkName,bookmarkType,category,photo} = req.body
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

async function getMyBookmarks(req,res){
    try{
        const bookmarks =await BookMarkService.getBookmarks({userId:req.user._id});
        return res 
                  .status(StatusCodes.OK)
                  .json(bookmarks); 
    }catch(error){
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }

}


async function getSpecificBookmark(req,res){
    try{
        const bookmarks =await BookMarkService.getSpecificBookmark(req.params.id);
        return res 
                  .status(StatusCodes.OK)
                  .json(bookmarks); 
    }catch(error){
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }

}

async function getAllPublicBookmarks(req,res){
    try{
        const bookmarks= await BookMarkService.getBookmarks(req.query)
        return res
                  .status(StatusCodes.OK)
                  .json(bookmarks)
    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }
}


async function getCategories(req,res){
    try{
        const categories=BookmarkCategories;
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


async function getBookmarksByCategory(req,res){

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


    }catch(error){
        ErrorResponse.error=error
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }

}





module.exports={createBookMark,getMyBookmarks,getSpecificBookmark,getAllPublicBookmarks,getBookmarksByCategory,updateBookmark,getCategories}