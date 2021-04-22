import { Response } from "express";
import { SuccessResponse } from "../types/types";

export interface ApiResponse {
  resp: Response;
  data: SuccessResponse;
  statusCode: number;
}

export const successResponse = (respData: any): any => {
  return respData;
};

export const apiResponse = (
  resp: Response,
  data: SuccessResponse,
  statusCode: number
): Response => {
  return resp.status(statusCode).json(data);
};
