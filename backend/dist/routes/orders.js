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
const orderController = new controllers_1.OrderController(new services_1.OrderService());
const router = express_1.Router();
router.post("/", checkAuth_1.default, express_async_handler_1.default(orderController.addOrdersItems));
router.get("/", checkAuth_1.default, checkIsAdmin_1.default, express_async_handler_1.default(orderController.getOrders));
router.get("/myorders", checkAuth_1.default, express_async_handler_1.default(orderController.getUserLoggedInOrders));
router.get("/:id", checkAuth_1.default, express_async_handler_1.default(orderController.getOrderById));
router.put("/:id/pay", checkAuth_1.default, express_async_handler_1.default(orderController.updateOrderToPaid));
router.put("/:id/deliver", checkAuth_1.default, checkIsAdmin_1.default, express_async_handler_1.default(orderController.updateOrderToDelivered));
exports.default = router;
//# sourceMappingURL=orders.js.map