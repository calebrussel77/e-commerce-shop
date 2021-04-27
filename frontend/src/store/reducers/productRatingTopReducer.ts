import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";
import { ProductType } from "../../types/types.models";

interface actionType {
  type: string;
  payload: any;
}

interface IIniatialUserState {
  isLoading: boolean;
  error: boolean;
  success: boolean;
  topProducts: Partial<ProductType[]>;
}

const initialState: IIniatialUserState = {
  isLoading: false,
  error: false,
  success: false,
  topProducts: [],
};

const ProductRatingTopReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.PRODUCT_RATING_TOP_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.PRODUCT_RATING_TOP_SUCCESS:
      return updateObject(state, {
        topProducts: action?.payload?.products,
        isLoading: false,
        success: true,
      });
    case actionTypes.PRODUCT_RATING_TOP_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
        success: false,
      });

    default:
      return state;
  }
};

export default ProductRatingTopReducer;
