import * as actionsTypes from "./actionsTypes";
import axios from "axios";

import { addNotif } from "./notif";
import {
  applicationJson,
  IReview,
  ProductType,
} from "../../types/types.models";
import { store } from "../..";

const productCreateReviewStart = () => {
  return {
    type: actionsTypes.PRODUCT_CREATE_REVIEW_START,
  };
};
const productCreateReviewError = () => {
  return {
    type: actionsTypes.PRODUCT_CREATE_REVIEW_ERROR,
  };
};

const productCreateReviewSuccess = (createdReview: Partial<IReview>) => {
  return {
    type: actionsTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
    payload: { createdReview },
  };
};

export const productCreateReviewReset = () => {
  return {
    type: actionsTypes.PRODUCT_CREATE_REVIEW_RESET,
  };
};

export const createReview = (productId: string, review: IReview) => {
  return (dispatch: any) => {
    dispatch(productCreateReviewStart());
    axios
      .post(`/api/products/${productId}/reviews`, review, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(productCreateReviewSuccess(resp.data.createdProduct));
        dispatch(addNotif("SUCCESS", resp.data.msg));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(productCreateReviewError());
        console.log(error);
      });
  };
};
