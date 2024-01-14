const express =  require("express");
const { BookMarkController } = require("../../controllers");
const protect = require("../../middlewares/auth-middleware")
const router = express.Router();

router.post('/newbookmark',protect,BookMarkController.createBookMark)
router.get('/mybookmarks',protect,BookMarkController.getMyBookmarks)
router.get('/publicbookmarks',BookMarkController.getAllPublicBookmarks)
router.get('/',BookMarkController.getBookmarksByCategory)
router.get('/:id',BookMarkController.getSpecificBookmark)
router.patch('/',protect,BookMarkController.updateBookmark)

module.exports=router;