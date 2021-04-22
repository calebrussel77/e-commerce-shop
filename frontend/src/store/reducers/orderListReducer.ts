import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";
import { IOrder } from "../../types/types.models";

interface actionType {
  type: string;
  payload: any;
}
interface IIniatialUserListState {
  orders: Partial<IOrder[] | []>;
  isLoading: boolean;
  error: boolean;
}

const initialState: IIniatialUserListState = {
  orders: [],
  isLoading: false,
  error: false,
};

const UserListReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.ORDER_LIST_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.ORDER_LIST_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        orders: action?.payload?.orders,
      });
    case actionTypes.ORDER_LIST_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
      });
    default:
      return state;
  }
};

export default UserListReducer;
