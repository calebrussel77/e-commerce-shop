"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_1 = __importDefault(require("../models/order"));
/**
 * OrderService class handles the logic needed to work with the order data.
 * @class
 * @public
 * @author Caleb russel
 */
class OrderService {
    /**
     * Creates an instance of order service.
     * @author Caleb russel
     */
    constructor() {
        // this.getProducts = this.getProducts.bind(this);
        this.getOrderById = this.getOrderById.bind(this);
        this.addOrdersItems = this.addOrdersItems.bind(this);
        this.getUserLoggedInOrders = this.getUserLoggedInOrders.bind(this);
        this.getOrders = this.getOrders.bind(this);
    }
    /**
     * get single order
     * @public
     * @method {getOrderById}
     * @author Caleb russel
     * @returns {Promise<IOrder | null>} single order informations
     */
    getOrderById(orderId) {
        return order_1.default.findById(orderId)
            .populate("user", "name email image")
            .then((result) => result);
    }
    /**
     * get user logged in orders
     * @public
     * @method {getUserLoggedInOrders}
     * @author Caleb russel
     * @returns {Promise<IOrder[] | null>}
     */
    getUserLoggedInOrders(userId) {
        return order_1.default.find({ user: userId }).then((result) => result);
    }
    /**
     * get all orders
     * @public
     * @method {getOrders}
     * @author Caleb russel
     * @returns {Promise<IOrder[] | null>}
     */
    getOrders() {
        return order_1.default.find()
            .populate("user", "_id name email image")
            .then((result) => result);
    }
    /**
     * create a new order item
     * @public
     * @method {addOrdersItems}
     * @author Caleb russel
     * @returns {Promise<IOrder | null>} order
     */
    addOrdersItems(orderData) {
        let newOrderItem = new order_1.default(orderData);
        return newOrderItem.save();
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orderService.js.map