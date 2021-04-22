"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const inputValidator_1 = require("../middlewares/inputValidator");
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const checkIsAdmin_1 = __importDefault(require("../middlewares/checkIsAdmin"));
const userController = new controllers_1.UserController(new services_1.UserService());
const router = express_1.Router();
router.get("/", checkAuth_1.default, checkIsAdmin_1.default, express_async_handler_1.default(userController.getAllUsers));
router.post("/login", inputValidator_1.loginInputValidator(), express_async_handler_1.default(userController.signInUser));
router.post("/register", inputValidator_1.registerInputValidator(), express_async_handler_1.default(userController.registerUser));
router.get("/profile", checkAuth_1.default, express_async_handler_1.default(userController.getUserProfile));
router.put("/profile", inputValidator_1.registerInputValidator(), checkAuth_1.default, express_async_handler_1.default(userController.updateUserProfileInfo));
router.get("/:id", checkAuth_1.default, checkIsAdmin_1.default, express_async_handler_1.default(userController.getUserById));
router.put("/:id", checkAuth_1.default, checkIsAdmin_1.default, express_async_handler_1.default(userController.updateUser));
router.delete("/:userId", checkAuth_1.default, checkIsAdmin_1.default, express_async_handler_1.default(userController.deleteUserById));
exports.default = router;
//# sourceMappingURL=users.js.map