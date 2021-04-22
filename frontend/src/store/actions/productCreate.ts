import * as actionsTypes from "./actionsTypes";
import axios from "axios";

import { addNotif } from "./notif";
import { applicationJson, ProductType } from "../../types/types.models";
import { store } from "../..";

export const productCreateStart = () => {
  return {
    type: actionsTypes.PRODUCT_CREATE_START,
  };
};
export const productCreateError = () => {
  return {
    type: actionsTypes.PRODUCT_CREATE_ERROR,
  };
};
export const resetProduct = () => {
  return {
    type: actionsTypes.PRODUCT_CREATE_RESET,
  };
};
export const productCreateSuccess = (createdProduct: Partial<ProductType>) => {
  return {
    type: actionsTypes.PRODUCT_CREATE_SUCCESS,
    payload: { createdProduct },
  };
};

export const createProduct = () => {
  return (dispatch: any) => {
    dispatch(productCreateStart());
    axios
      .post(
        `/api/products`,
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
        dispatch(productCreateSuccess(resp.data.createdProduct));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(productCreateError());
        console.log(error);
      });
  };
};
