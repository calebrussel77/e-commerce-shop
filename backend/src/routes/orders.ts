import { Router } from "express";
import { OrderController } from "../controllers";
import { OrderService } from "../services";
import asyncHandler from "express-async-handler";
import checkAuth from "../middlewares/checkAuth";
import checkIsAdmin from "../middlewares/checkIsAdmin";

const orderController = new OrderController(new OrderService());

const router = Router();

router.post("/", checkAuth, asyncHandler(orderController.addOrdersItems));

router.get(
  "/",
  checkAuth,
  checkIsAdmin,
  asyncHandler(orderController.getOrders)
);

router.get(
  "/myorders",
  checkAuth,
  asyncHandler(orderController.getUserLoggedInOrders)
);

router.get("/:id", checkAuth, asyncHandler(orderController.getOrderById));

router.put(
  "/:id/pay",
  checkAuth,
  asyncHandler(orderController.updateOrderToPaid)
);
router.put(
  "/:id/deliver",
  checkAuth,
  checkIsAdmin,
  asyncHandler(orderController.updateOrderToDelivered)
);

export default router;
