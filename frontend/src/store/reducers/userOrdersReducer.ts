import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";

interface actionType {
  type: string;
  payload: any;
}

const initialState = {
  isLoading: false,
  error: false,
  userOrders: [],
  success: false,
};

const UserOrdersReucers = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.USER_ORDERS_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.USER_ORDERS_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        userOrders: [...action.payload.userOrders],
        success: true,
      });
    case actionTypes.USER_ORDERS_RESET:
      return updateObject(state, {
        isLoading: false,
        userOrders: [],
      });
    case actionTypes.USER_ORDERS_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
        success: false,
      });
    default:
      return state;
  }
};

export default UserOrdersReucers;
