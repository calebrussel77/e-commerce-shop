import * as actionsTypes from "./actionsTypes";

import { addNotif } from "./notif";
import { applicationJson, IUser, ProductType } from "../../types/types.models";
import axios from "axios";
import { store } from "../..";

export const productUpdateStart = () => {
  return {
    type: actionsTypes.PRODUCT_UPDATE_START,
  };
};
const productUpdateError = () => {
  return {
    type: actionsTypes.PRODUCT_UPDATE_ERROR,
  };
};

export const resetUpdatedProduct = () => {
  return {
    type: actionsTypes.PRODUCT_UPDATE_RESET,
  };
};

const productUpdateSuccess = () => {
  return {
    type: actionsTypes.PRODUCT_UPDATE_SUCCESS,
  };
};

export const updateProductData = (
  id: string,
  productInfo: Partial<ProductType>
) => {
  return (dispatch: any) => {
    dispatch(productUpdateStart());
    axios
      .put(`/api/products/${id}`, productInfo, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        if (resp?.data) {
          dispatch(productUpdateSuccess());
          dispatch(addNotif("SUCCESS", resp.data.msg));
        }
      })
      .catch((error) => {
        console.log(error);
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(productUpdateError());
      });
  };
};
