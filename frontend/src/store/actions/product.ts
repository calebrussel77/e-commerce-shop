import * as actionsTypes from "./actionsTypes";

import { applicationJson, ProductType } from "../../types/types.models";
import { addNotif } from "./notif";
import axios from "axios";
import { store } from "../..";

export const productStart = () => {
  return {
    type: actionsTypes.PRODUCT_START,
  };
};

export const productError = () => {
  return {
    type: actionsTypes.PRODUCT_ERROR,
  };
};

//Get All Products
export const getProducts = (products: ProductType[]) => {
  return {
    type: actionsTypes.GET_PRODUCT_SUCCESS,
    payload: { products },
  };
};
//Get Details of single Product
export const getSingleProduct = (product: ProductType | null) => {
  return {
    type: actionsTypes.GET_PRODUCT_DETAILS_SUCCESS,
    payload: { product },
  };
};

//Get Details of single Product
export const productDeleteSuccess = (productId: string) => {
  return {
    type: actionsTypes.PRODUCT_DELETE_SUCCESS,
    payload: { productId },
  };
};

export const getProductsList = () => {
  return (dispatch: any) => {
    dispatch(productStart());
    axios
      .get("/api/products", {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(getProducts(resp.data?.products));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(productError());
      });
  };
};

export const getProductDetails = (id: string) => {
  return (dispatch: any) => {
    dispatch(productStart());
    axios
      .get(`/api/products/${id}`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(getSingleProduct(resp.data?.product));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(productError());
      });
  };
};

export const searchProductStart = () => {
  return {
    type: actionsTypes.PRODUCT_SEARCH_START,
  };
};
export const searchProduct = (productSearch: string) => {
  return {
    type: actionsTypes.PRODUCT_SEARCH_SUCCESS,
    payload: { productSearch },
  };
};

export const resetProductSearch = () => {
  return {
    type: actionsTypes.PRODUCT_SEARCH_RESET,
  };
};

export const deleteProductById = (productId: string) => {
  return (dispatch: any) => {
    axios
      .delete(`/api/products/${productId}`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(productDeleteSuccess(productId));
        dispatch(addNotif("SUCCESS", resp.data.msg));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        console.log(error);
      });
  };
};
