import * as actionsTypes from "./actionsTypes";

import { addNotif } from "./notif";
import { applicationJson } from "../../types/types.models";
import axios from "axios";
import { store } from "../..";

const orderDeliverStart = () => {
  return {
    type: actionsTypes.ORDERS_DELIVER_START,
  };
};

const orderDeliverError = () => {
  return {
    type: actionsTypes.ORDERS_DELIVER_ERROR,
  };
};
export const orderDeliverReset = () => {
  return {
    type: actionsTypes.ORDERS_DELIVER_RESET,
  };
};

const orderDeliverSuccess = () => {
  return {
    type: actionsTypes.ORDERS_DELIVER_SUCCESS,
  };
};

export const deliverOrder = (orderId: string) => {
  return (dispatch: any) => {
    dispatch(orderDeliverStart());
    axios
      .put(
        `/api/orders/${orderId}/deliver`,
        {},
        {
          baseURL: process.env.REACT_APP_BASE_URL,
          headers: {
            "content-type": applicationJson,
            Authorization: `Bearer ${store?.getState()?.user?.token}`,
          },
        }
      )
      .then((resp) => {
        dispatch(orderDeliverSuccess());
        dispatch(addNotif("SUCCESS", resp.data.msg));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(orderDeliverError());
      });
  };
};
