import * as actionsTypes from "./actionsTypes";

import { addNotif } from "./notif";
import { applicationJson, IPaymentResult } from "../../types/types.models";
import axios from "axios";
import { store } from "../..";

export const orderPayStart = () => {
  return {
    type: actionsTypes.ORDERS_PAY_START,
  };
};

export const orderPayError = () => {
  return {
    type: actionsTypes.ORDERS_PAY_ERROR,
  };
};

export const payOrderSuccess = () => {
  return {
    type: actionsTypes.ORDERS_PAY_SUCCESS,
  };
};
export const payOrderReset = () => {
  return {
    type: actionsTypes.ORDERS_PAY_RESET,
  };
};

export const payOrder = (orderId: string, paymentResult: IPaymentResult) => {
  return (dispatch: any) => {
    dispatch(orderPayStart());
    axios
      .put(`/api/orders/${orderId}/pay`, paymentResult, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(payOrderSuccess());
        dispatch(addNotif("SUCCESS", resp.data.msg));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(orderPayError());
      });
  };
};
