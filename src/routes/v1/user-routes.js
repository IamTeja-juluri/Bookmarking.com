const express =  require("express");
const { UserController } = require("../../controllers");
const {UserMiddlewares} = require("../../middlewares")
const router = express.Router();

router.post("/register",UserMiddlewares.validateRegisterUser,UserController.createUser)
router.post("/login",UserMiddlewares.validateCreateRequest,UserController.loginUser)
router.get("/logout",UserController.logout)

module.exports=router;