import axios from "axios";
import { store } from "../..";
import { applicationJson } from "../../types/types.models";
import * as actionsTypes from "./actionsTypes";

import { addNotif } from "./notif";

export const orderStart = () => {
  return {
    type: actionsTypes.ORDER_START,
  };
};

export const orderError = () => {
  return {
    type: actionsTypes.ORDER_ERROR,
  };
};

export const createOrderSuccess = (orderItem: any) => {
  return {
    type: actionsTypes.ORDER_CREATE_SUCCESS,
    payload: { orderItem },
  };
};

//Get Details of single Order
export const getSingleOrder = (orderDetails: any) => {
  return {
    type: actionsTypes.ORDER_DETAILS_SUCCESS,
    payload: { orderDetails },
  };
};

export const createOrderItem = (order: any) => {
  return (dispatch: any) => {
    dispatch(orderStart());
    axios
      .post("/api/orders", order, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(createOrderSuccess(resp.data?.createdOrderItem));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(orderError());
      });
  };
};

export const getOrderDetails = (orderId: string) => {
  return (dispatch: any) => {
    dispatch(orderStart());
    axios
      .get(`/api/orders/${orderId}`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(getSingleOrder(resp.data?.orderDetails));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(orderError());
      });
  };
};
