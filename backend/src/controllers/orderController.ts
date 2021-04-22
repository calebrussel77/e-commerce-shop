import { Response } from "express";
import { OrderService } from "../services";
import { apiResponse, successResponse } from "../utils/response";
import { IRequest } from "../types/types";

export class OrderController {
  /**
   * @description productService
   * @type {ProductService}
   */
  private orderService: OrderService;

  /**
   * @description Creates an instance of order controller.
   * @author Caleb Russel
   * @constructor
   * @param {OrderService} orderService
   */
  public constructor(orderService: OrderService) {
    this.orderService = orderService;
    this.addOrdersItems = this.addOrdersItems.bind(this);
    this.getOrderById = this.getOrderById.bind(this);
    this.getUserLoggedInOrders = this.getUserLoggedInOrders.bind(this);
    this.updateOrderToPaid = this.updateOrderToPaid.bind(this);
    this.updateOrderToDelivered = this.updateOrderToDelivered.bind(this);
  }

  /**
   * get user loggedIn Orders
   * @get
   * @async
   * @private
   */
  public getUserLoggedInOrders = async (
    req: IRequest,
    resp: Response
  ): Promise<Response> => {
    const userId = req?.userData?._id;

    const orders = await this.orderService.getUserLoggedInOrders(userId);

    if (orders) {
      return apiResponse(
        resp,
        successResponse({
          msg: "Vos differents achats.",
          userOrders: orders,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Achats non trouvés.");
    }
  };

  /**
   * get uall orders
   * @get
   * @async
   * @private/admin
   */
  public getOrders = async (
    _req: IRequest,
    resp: Response
  ): Promise<Response> => {
    const orders = await this.orderService.getOrders();

    if (orders) {
      return apiResponse(
        resp,
        successResponse({
          orders,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Achats non trouvés.");
    }
  };

  /**
   * get order item by id
   * @get
   * @async
   * @private
   */
  public getOrderById = async (
    req: IRequest,
    resp: Response
  ): Promise<Response> => {
    const orderId = req.params.id;

    const order = await this.orderService.getOrderById(orderId);

    if (order) {
      return apiResponse(
        resp,
        successResponse({
          msg: "Information de la commande",
          orderDetails: order,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Cette commande n'existe plus.");
    }
  };

  /**
   * update order to paid
   * @update
   * @async
   * @private
   */
  public updateOrderToPaid = async (
    req: IRequest,
    resp: Response
  ): Promise<Response> => {
    const orderId = req.params.id;

    const order = await this.orderService.getOrderById(orderId);

    if (order) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      return apiResponse(
        resp,
        successResponse({
          msg: "Payement effectué avec succès.",
          updatedOrder: updatedOrder,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Cette commande n'existe plus.");
    }
  };

  /**
   * update order to delivered
   * @update
   * @async
   * @private/admin
   */
  public updateOrderToDelivered = async (
    req: IRequest,
    resp: Response
  ): Promise<Response> => {
    const orderId = req.params.id;

    const order = await this.orderService.getOrderById(orderId);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = new Date();
      const updatedOrder = await order.save();

      return apiResponse(
        resp,
        successResponse({
          msg: "Commande marquée comme livrée.",
          updatedOrder,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Cette commande n'existe plus.");
    }
  };

  /**
   * Add order item into the database
   * @post
   * @async
   * @private
   */
  public addOrdersItems = async (
    req: IRequest,
    resp: Response
  ): Promise<Response> => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const orderData = {
      orderItems,
      user: req?.userData._id,
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
    } else {
      const createdOrderItem = await this.orderService.addOrdersItems(
        orderData
      );
      return apiResponse(
        resp,
        successResponse({
          msg: "Commande crée avec succès.",
          createdOrderItem,
          success: true,
        }),
        201
      );
    }
  };
}
