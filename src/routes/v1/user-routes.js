const express =  require("express");
const { UserController } = require("../../controllers");
const {UserMiddlewares} = require("../../middlewares");
const protect = require("../../middlewares/auth-middleware");
const router = express.Router();

router.post("/register",UserMiddlewares.validateRegisterUser,UserController.createUser)
router.post("/login",UserMiddlewares.validateCreateRequest,UserController.loginUser)
router.get("/logout",UserController.logout)
router.patch("/forgotPassword",protect,UserController.forgotPassword)

module.exports=router;