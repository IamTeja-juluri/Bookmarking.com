const express= require('express');
const { InfoController }=require('../../controllers')
const UserRoutes = require("./user-routes")
const CategoryRoutes = require("./category-routes")
const router=express.Router();
router.get('/info',InfoController.info)
router.use('/user',UserRoutes)
router.use('/category',CategoryRoutes)
module.exports=router