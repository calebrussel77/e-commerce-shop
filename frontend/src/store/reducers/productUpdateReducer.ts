import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";

interface actionType {
  type: string;
  payload: any;
}

interface IIniatialUserState {
  isLoading: boolean;
  error: boolean;
  success: boolean;
}

const initialState: IIniatialUserState = {
  isLoading: false,
  error: false,
  success: false,
};

const ProductUpdateReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.PRODUCT_UPDATE_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        success: true,
      });
    case actionTypes.PRODUCT_UPDATE_RESET:
      return updateObject(state, {
        isLoading: false,
        error: false,
        success: false,
      });
    case actionTypes.PRODUCT_UPDATE_ERROR:
      return updateObject(state, {
        isLoading: false,
      });
    default:
      return state;
  }
};

export default ProductUpdateReducer;
