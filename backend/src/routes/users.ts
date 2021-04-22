import { Router } from "express";
import { UserController } from "../controllers";
import { UserService } from "../services";
import asyncHandler from "express-async-handler";
import {
  loginInputValidator,
  registerInputValidator,
} from "../middlewares/inputValidator";
import checkAuth from "../middlewares/checkAuth";
import checkIsAdmin from "../middlewares/checkIsAdmin";

const userController = new UserController(new UserService());

const router = Router();

router.get(
  "/",
  checkAuth,
  checkIsAdmin,
  asyncHandler(userController.getAllUsers)
);

router.post(
  "/login",
  loginInputValidator(),
  asyncHandler(userController.signInUser)
);
router.post(
  "/register",
  registerInputValidator(),
  asyncHandler(userController.registerUser)
);

router.get("/profile", checkAuth, asyncHandler(userController.getUserProfile));

router.put(
  "/profile",
  registerInputValidator(),
  checkAuth,
  asyncHandler(userController.updateUserProfileInfo)
);
router.get(
  "/:id",
  checkAuth,
  checkIsAdmin,
  asyncHandler(userController.getUserById)
);
router.put(
  "/:id",
  checkAuth,
  checkIsAdmin,
  asyncHandler(userController.updateUser)
);

router.delete(
  "/:userId",
  checkAuth,
  checkIsAdmin,
  asyncHandler(userController.deleteUserById)
);
export default router;
