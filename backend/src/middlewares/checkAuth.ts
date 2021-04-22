import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import { IRequest } from "../types/types";
import { UserService } from "../services";

export default asyncHandler(
  async (req: IRequest, resp: Response, next: NextFunction) => {
    try {
      req.userData = null;

      const userService = new UserService();
      const token = req.headers?.authorization!.split(" ")[1];
      const decodedToken: any = jwt.verify(
        token,
        String(process.env.JWT_SECRET_KEY)
      );
      req.userData = await userService.findUserById(decodedToken._id);

      next();
    } catch (err) {
      resp.status(401);
      throw new Error(
        "Vous n'êtes pas auhentifié pour avoir accès à cette ressource. "
      );
    }
  }
);
