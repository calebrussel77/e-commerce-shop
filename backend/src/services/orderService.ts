import Order, { IOrder } from "../models/order";

/**
 * OrderService class handles the logic needed to work with the order data.
 * @class
 * @public
 * @author Caleb russel
 */
export class OrderService {
  /**
   * Creates an instance of order service.
   * @author Caleb russel
   */
  public constructor() {
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
  public getOrderById(orderId: string): Promise<IOrder | null> {
    return Order.findById(orderId)
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
  public getUserLoggedInOrders(userId: string): Promise<IOrder[] | null> {
    return Order.find({ user: userId }).then((result) => result);
  }

  /**
   * get all orders
   * @public
   * @method {getOrders}
   * @author Caleb russel
   * @returns {Promise<IOrder[] | null>}
   */
  public getOrders(): Promise<IOrder[] | null> {
    return Order.find()
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
  public addOrdersItems(orderData: Partial<IOrder>): Promise<IOrder | null> {
    let newOrderItem = new Order(orderData);
    return newOrderItem.save();
  }
}
