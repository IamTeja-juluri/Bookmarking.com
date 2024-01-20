const express =  require("express");
const { UserController } = require("../../controllers");
const {UserMiddlewares} = require("../../middlewares");
const protect = require("../../middlewares/auth-middleware");
const router = express.Router();

router.post("/register",UserMiddlewares.validateRegisterUser,UserController.createUser)
router.post("/login",UserMiddlewares.validateCreateRequest,UserController.loginUser)
router.get("/logout",UserController.logout)
router.get("/loginstatus",UserController.loginStatus)
router.post("/forgotPassword",UserController.forgotPassword)
router.patch("/changepassword",protect,UserMiddlewares.validatechangePassword,UserController.changePassword)
router.patch("/resetPassword/:resetToken",UserMiddlewares.validateResetPassword,UserController.resetPassword)

module.exports=router;