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
  product: Partial<ProductType | null>;
}

const initialState: IIniatialUserState = {
  isLoading: false,
  error: false,
  success: false,
  product: null,
};

const ProductCreateReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CREATE_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return updateObject(state, {
        product: action?.payload?.createdProduct,
        isLoading: false,
        success: true,
      });
    case actionTypes.PRODUCT_CREATE_ERROR:
      return updateObject(state, {
        isLoading: false,
      });
    case actionTypes.PRODUCT_CREATE_RESET:
      return updateObject(state, {
        isLoading: false,
        error: false,
        success: false,
        product: null,
      });

    default:
      return state;
  }
};

export default ProductCreateReducer;
