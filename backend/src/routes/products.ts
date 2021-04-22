import { Router } from "express";
import { ProductController } from "../controllers";
import { ProductService } from "../services";
import asyncHandler from "express-async-handler";
import checkAuth from "../middlewares/checkAuth";
import checkIsAdmin from "../middlewares/checkIsAdmin";

const productController = new ProductController(new ProductService());

const router = Router();

router.get("/", asyncHandler(productController.getProducts));

router.get(
  "/rating/top",
  asyncHandler(productController.getProductsSortedByRating)
);

router.get("/:productId", asyncHandler(productController.getProductById));

router.post(
  "/",
  checkAuth,
  checkIsAdmin,
  asyncHandler(productController.addProduct)
);

router.put(
  "/:productId",
  checkAuth,
  checkIsAdmin,
  asyncHandler(productController.updateProduct)
);

router.post(
  "/:productId/reviews",
  checkAuth,
  asyncHandler(productController.addReview)
);

router.delete(
  "/:productId",
  checkAuth,
  checkIsAdmin,
  asyncHandler(productController.deleteProductById)
);

export default router;
