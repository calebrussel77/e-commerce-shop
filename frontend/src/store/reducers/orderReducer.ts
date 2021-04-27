import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";

interface actionType {
  type: string;
  payload: any;
}

const initialState = {
  isLoading: false,
  error: false,
  orderItem: {},
  success: false,
  orderDetails: {},
};

const OrderReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.ORDER_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.ORDER_CREATE_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        orderItem: action.payload.orderItem,
        success: true,
      });
    case actionTypes.ORDER_DETAILS_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        orderDetails: action.payload.orderDetails,
      });
    case actionTypes.ORDER_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
        success: false,
      });
    default:
      return state;
  }
};

export default OrderReducer;
