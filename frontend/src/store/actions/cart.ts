import * as actionsTypes from "./actionsTypes";
import {
  ProductType,
  IShippingAddress,
  applicationJson,
} from "../../types/types.models";
import { addNotif } from "./notif";
import { store } from "../../../src/index";
import axios from "axios";

//add product item to the cart
export const addCartItem = (product: ProductType | null, qty: number) => {
  return {
    type: actionsTypes.CART_ITEM_ADD,
    payload: {
      cartItem: {
        product: product?._id,
        name: product?.name,
        price: product?.price,
        countInStock: product?.countInStock,
        image: product?.image,
        qty,
      },
    },
  };
};

//remove product item to the cart
export const removeCartItem = (product: string) => {
  return {
    type: actionsTypes.CART_ITEM_REMOVE,
    payload: {
      cartItem: {
        product,
      },
    },
  };
};

export const removeToCart = (product: string) => {
  return (dispatch: any) => {
    dispatch(removeCartItem(product));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(store.getState().cart.cartItems)
    );
    dispatch(addNotif("SUCCESS", "produit supprimé de votre pannier."));
  };
};

export const addToCart = (product: string, qty: number) => {
  return (dispatch: any) => {
    // dispatch(productStart());
    axios
      .get(`/api/products/${product}`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(addCartItem(resp.data?.product, qty));
        localStorage.setItem(
          "cartItems",
          JSON.stringify(store.getState().cart.cartItems)
        );
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
      });
  };
};

//Shipping actions
export const cartSaveShippingAddress = (data: IShippingAddress) => {
  return {
    type: actionsTypes.CART_SAVE_SHIPPING_ADDRESS,
    payload: {
      shippingAddress: data,
    },
  };
};
export const saveShippingAddress = (data: IShippingAddress) => {
  return (dispatch: any) => {
    dispatch(cartSaveShippingAddress(data));
    localStorage.setItem("shippingAddress", JSON.stringify(data));
    // dispatch(addNotif("SUCCESS", "produit supprimé de votre pannier."));
  };
};

export const cartSavePaymentMethod = (data: string) => {
  return {
    type: actionsTypes.CART_SAVE_PAYMENT_METHOD,
    payload: {
      paymentMethod: data,
    },
  };
};

export const savePaymentMethod = (data: string) => {
  return (dispatch: any) => {
    dispatch(cartSavePaymentMethod(data));
    localStorage.setItem("paymentMethod", JSON.stringify(data));
    // dispatch(addNotif("SUCCESS", "produit supprimé de votre pannier."));
  };
};
