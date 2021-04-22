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

const ProductCreateReviewReducer = (
  state = initialState,
  action: actionType
) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CREATE_REVIEW_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return updateObject(state, {
        review: action?.payload?.createdReview,
        isLoading: false,
        success: true,
      });
    case actionTypes.PRODUCT_CREATE_REVIEW_ERROR:
      return updateObject(state, {
        isLoading: false,
        success: false,
      });
    case actionTypes.PRODUCT_CREATE_REVIEW_RESET:
      return updateObject(state, {
        isLoading: false,
        error: false,
        success: false,
        review: null,
      });

    default:
      return state;
  }
};

export default ProductCreateReviewReducer;
