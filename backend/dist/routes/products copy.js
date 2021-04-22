"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const services_1 = require("../services");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productController = new controllers_1.ProductController(new services_1.ProductService());
const router = express_1.Router();
router.get("/", express_async_handler_1.default(productController.getProducts));
router.get("/:id", express_async_handler_1.default(productController.getProductById));
router.post("/", express_async_handler_1.default(productController.addProduct));
// router.post("/", filiateController.addFiliate);
// router.get("/edit/:id", filiateController.getEditFiliate);
// router.put("/:id", filiateController.updateFiliate);
// router.delete("/:id", filiateController.removeFiliate);
exports.default = router;
//# sourceMappingURL=products%20copy.js.map