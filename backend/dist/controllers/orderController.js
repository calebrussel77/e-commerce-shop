"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const response_1 = require("../utils/response");
class OrderController {
    /**
     * @description Creates an instance of order controller.
     * @author Caleb Russel
     * @constructor
     * @param {OrderService} orderService
     */
    constructor(orderService) {
        /**
         * get user loggedIn Orders
         * @get
         * @async
         * @private
         */
        this.getUserLoggedInOrders = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req === null || req === void 0 ? void 0 : req.userData) === null || _a === void 0 ? void 0 : _a._id;
            const orders = yield this.orderService.getUserLoggedInOrders(userId);
            if (orders) {
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Vos differents achats.",
                    userOrders: orders,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Achats non trouvés.");
            }
        });
        /**
         * get uall orders
         * @get
         * @async
         * @private/admin
         */
        this.getOrders = (_req, resp) => __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderService.getOrders();
            if (orders) {
                return response_1.apiResponse(resp, response_1.successResponse({
                    orders,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Achats non trouvés.");
            }
        });
        /**
         * get order item by id
         * @get
         * @async
         * @private
         */
        this.getOrderById = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            const order = yield this.orderService.getOrderById(orderId);
            if (order) {
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Information de la commande",
                    orderDetails: order,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Cette commande n'existe plus.");
            }
        });
        /**
         * update order to paid
         * @update
         * @async
         * @private
         */
        this.updateOrderToPaid = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            const order = yield this.orderService.getOrderById(orderId);
            if (order) {
                order.isPaid = true;
                order.paidAt = new Date();
                order.paymentResult = {
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.email_address,
                };
                const updatedOrder = yield order.save();
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Payement effectué avec succès.",
                    updatedOrder: updatedOrder,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Cette commande n'existe plus.");
            }
        });
        /**
         * update order to delivered
         * @update
         * @async
         * @private/admin
         */
        this.updateOrderToDelivered = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            const order = yield this.orderService.getOrderById(orderId);
            if (order) {
                order.isDelivered = true;
                order.deliveredAt = new Date();
                const updatedOrder = yield order.save();
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Commande marquée comme livrée.",
                    updatedOrder,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Cette commande n'existe plus.");
            }
        });
        /**
         * Add order item into the database
         * @post
         * @async
         * @private
         */
        this.addOrdersItems = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const { orderItems, shippingAddress, paymentMethod, taxPrice, itemsPrice, shippingPrice, totalPrice, } = req.body;
            const orderData = {
                orderItems,
                user: req === null || req === void 0 ? void 0 : req.userData._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            };
            if (orderItems && orderItems.length === 0) {
                resp.status(400);
                throw new Error("aucun produits commandé.");
            }
            else {
                const createdOrderItem = yield this.orderService.addOrdersItems(orderData);
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Commande crée avec succès.",
                    createdOrderItem,
                    success: true,
                }), 201);
            }
        });
        this.orderService = orderService;
        this.addOrdersItems = this.addOrdersItems.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.getUserLoggedInOrders = this.getUserLoggedInOrders.bind(this);
        this.updateOrderToPaid = this.updateOrderToPaid.bind(this);
        this.updateOrderToDelivered = this.updateOrderToDelivered.bind(this);
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map