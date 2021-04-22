"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const checkIsAdmin_1 = __importDefault(require("../middlewares/checkIsAdmin"));
const productController = new controllers_1.ProductController(new services_1.ProductService());
const router = express_1.Router();
router.get("/", express_async_handler_1.default(productController.getProducts));
router.get("/rating/top", express_async_handler_1.default(productController.getProductsSortedByRating));
router.get("/:productId", express_async_handler_1.default(productController.getProductById));
router.post("/", checkAuth_1.default, checkIsAdmin_1.default, express_async_handler_1.default(productController.addProduct));
router.put("/:productId", checkAuth_1.default, checkIsAdmin_1.default, express_async_handler_1.default(productController.updateProduct));
router.post("/:productId/reviews", checkAuth_1.default, express_async_handler_1.default(productController.addReview));
router.delete("/:productId", checkAuth_1.default, checkIsAdmin_1.default, express_async_handler_1.default(productController.deleteProductById));
exports.default = router;
//# sourceMappingURL=products.js.map