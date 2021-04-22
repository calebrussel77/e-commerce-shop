import * as actionsTypes from "./actionsTypes";

import { addNotif } from "./notif";
import { applicationJson, IOrder } from "../../types/types.models";
import axios from "axios";
import { store } from "../..";

export const orderListStart = () => {
  return {
    type: actionsTypes.ORDER_LIST_START,
  };
};
export const orderListError = () => {
  return {
    type: actionsTypes.ORDER_LIST_ERROR,
  };
};

export const orderListSuccess = (orders: IOrder[]) => {
  return {
    type: actionsTypes.ORDER_LIST_SUCCESS,
    payload: { orders },
  };
};

export const getOrdersList = () => {
  return (dispatch: any) => {
    dispatch(orderListStart());
    axios
      .get(`/api/orders`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(orderListSuccess(resp.data.orders));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(orderListError());
        console.log(error);
      });
  };
};
