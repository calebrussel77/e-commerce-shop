import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";

interface actionType {
  type: string;
  payload: any;
}

const initialState = {
  isLoading: false,
  error: false,
  success: false,
};

const OrderDeliverReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.ORDERS_DELIVER_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.ORDERS_DELIVER_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        success: true,
      });
    case actionTypes.ORDERS_DELIVER_RESET:
      return updateObject(state, {
        isLoading: false,
        error: false,
        success: false,
      });
    case actionTypes.ORDERS_DELIVER_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
        success: false,
      });
    default:
      return state;
  }
};

export default OrderDeliverReducer;
