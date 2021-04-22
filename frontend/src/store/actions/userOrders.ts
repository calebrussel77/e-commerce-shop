import * as actionsTypes from "./actionsTypes";

import { addNotif } from "./notif";
import { applicationJson, IOrder } from "../../types/types.models";
import axios from "axios";
import { store } from "../..";

export const userOrdersStart = () => {
  return {
    type: actionsTypes.USER_ORDERS_START,
  };
};

export const userOrdersError = () => {
  return {
    type: actionsTypes.USER_ORDERS_ERROR,
  };
};
export const userOrdersReset = () => {
  return {
    type: actionsTypes.USER_ORDERS_RESET,
  };
};
export const userOrdersSuccess = (userOrders: IOrder[]) => {
  return {
    type: actionsTypes.USER_ORDERS_SUCCESS,
    payload: { userOrders },
  };
};

export const getuserOrders = () => {
  return (dispatch: any) => {
    dispatch(userOrdersStart());
    axios
      .get(`/api/orders/myorders`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(userOrdersSuccess(resp.data.userOrders));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(userOrdersError());
        console.log(error);
      });
  };
};
