const express= require('express');
const BookMarkRoutes = require("./bookmarks/bookMark-routes");
const protect = require('../../middlewares/auth-middleware');
const { CategoryController } = require('../../controllers');
const { CategoryMiddlewares, PaginatedResultsMiddlewares } = require('../../middlewares');
const { Category } = require('../../models');
const router=express.Router();
router.use(express.json());
router.use('/bookmark',BookMarkRoutes)
router.post('/new',protect,CategoryMiddlewares.validateCreateCategory,CategoryController.createCategory)
router.get('/',PaginatedResultsMiddlewares.paginatedResults(Category),CategoryController.getAllCategories)
router.get('/search/:key',CategoryController.searchCategories)
module.exports=router