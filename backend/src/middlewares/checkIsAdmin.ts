import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import { IRequest } from "../types/types";

export default asyncHandler(
  async (req: IRequest, resp: Response, next: NextFunction) => {
    if (req.userData && req.userData.isAdmin) {
      next();
    } else {
      resp.status(401);
      throw new Error("Vous n'êtes authorisé à accéder à cette ressource.");
    }
  }
);
