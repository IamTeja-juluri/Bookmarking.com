const express =  require("express");
const { BookMarkController } = require("../../../controllers");
const protect = require("../../../middlewares/auth-middleware")
const router = express.Router();
const {PaginatedResultsMiddlewares} = require('../../../middlewares');
const { BookMark } = require("../../../models");

router.post('/new',protect,BookMarkController.createBookMark)
router.get('/my',protect,BookMarkController.getMyBookmarks)
router.get('/find',PaginatedResultsMiddlewares.paginatedResults(BookMark),BookMarkController.getAnyBookmarksByQuery)
router.patch('/',protect,BookMarkController.updateBookmark)

module.exports=router;