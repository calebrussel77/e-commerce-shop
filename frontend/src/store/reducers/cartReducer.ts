import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";
import { ICartItem, IShippingAddress } from "../../types/types.models";

interface actionType {
  type: string;
  payload: {
    cartItem: ICartItem;
    shippingAddress: IShippingAddress | null;
    paymentMethod: string;
  };
}

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(String(localStorage.getItem("cartItems")))
  : [];
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(String(localStorage.getItem("shippingAddress")))
  : {};
const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(String(localStorage.getItem("paymentMethod")))
  : {};

const initialState = {
  cartItems: cartItemsFromLocalStorage,
  shippingAddress: shippingAddressFromLocalStorage,
  paymentMethod: paymentMethodFromLocalStorage,
};

const CartReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.CART_ITEM_ADD:
      const cartItem: ICartItem = action.payload.cartItem;
      const existItem: any = state.cartItems.find(
        (x: ICartItem) => x.product === cartItem.product
      );
      if (existItem) {
        return updateObject(state, {
          cartItems: state.cartItems.map((x: ICartItem) =>
            x.product === existItem?.product ? cartItem : x
          ),
        });
      } else {
        return updateObject(state, {
          cartItems: [...state.cartItems, cartItem],
        });
      }
    case actionTypes.CART_ITEM_REMOVE:
      return updateObject(state, {
        cartItems: state.cartItems.filter((item: ICartItem) => {
          return item.product !== action.payload.cartItem.product;
        }),
      });
    case actionTypes.CART_ITEM_RESET:
      return updateObject(state, {
        cartItems: [],
      });
    case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return updateObject(state, {
        shippingAddress: action.payload.shippingAddress,
      });
    case actionTypes.CART_SAVE_PAYMENT_METHOD:
      return updateObject(state, {
        paymentMethod: action.payload.paymentMethod,
      });

    default:
      return state;
  }
};

export default CartReducer;
