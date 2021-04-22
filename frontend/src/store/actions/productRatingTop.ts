import * as actionsTypes from "./actionsTypes";
import axios from "axios";

import { addNotif } from "./notif";
import { applicationJson, ProductType } from "../../types/types.models";

export const productTopRatedStart = () => {
  return {
    type: actionsTypes.PRODUCT_RATING_TOP_START,
  };
};
export const productTopRatedError = () => {
  return {
    type: actionsTypes.PRODUCT_RATING_TOP_ERROR,
  };
};
export const productTopRatedSuccess = (products: ProductType[]) => {
  return {
    type: actionsTypes.PRODUCT_RATING_TOP_SUCCESS,
    payload: { products },
  };
};

export const getTopRatedProducts = () => {
  return (dispatch: any) => {
    dispatch(productTopRatedStart());
    axios
      .get(`/api/products/rating/top`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
        },
      })
      .then((resp) => {
        dispatch(productTopRatedSuccess(resp.data.products));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(productTopRatedError());
        console.log(error);
      });
  };
};
