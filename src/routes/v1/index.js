const express= require('express');
const { InfoController }=require('../../controllers')
const BookMarkRoutes = require("./bookMark-routes")
const UserRoutes = require("./user-routes")

const router=express.Router();

router.get('/info',InfoController.info)
router.use('/user',UserRoutes)
router.use('/bookmark',BookMarkRoutes)

module.exports=router