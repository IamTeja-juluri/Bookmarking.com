const express =  require("express");
const { BookMarkController } = require("../../controllers");
const protect = require("../../middlewares/auth-middleware")
const router = express.Router();
const {PaginatedResultsMiddlewares} = require('../../middlewares');
const { BookMark } = require("../../models");

router.post('/newbookmark',protect,BookMarkController.createBookMark)
router.get('/mybookmarks',protect,BookMarkController.getMyBookmarks)
router.get('/publicbookmarks',BookMarkController.getAllPublicBookmarks)
router.get('/categories',BookMarkController.getCategories)
router.get('/',PaginatedResultsMiddlewares.paginatedResults(BookMark),BookMarkController.getBookmarksByCategory)
router.get('/:id',BookMarkController.getSpecificBookmark)
router.patch('/',protect,BookMarkController.updateBookmark)

module.exports=router;