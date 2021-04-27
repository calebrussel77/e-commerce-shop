import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";
import { ProductType } from "../../types/types.models";

interface actionType {
  type: string;
  payload: any;
}

interface IIniatialProductsState {
  isLoading: boolean;
  error: boolean;
  successDelete: boolean;
  isSearch: boolean;
  products: Partial<ProductType[] | []>;
  productsSearch: Partial<ProductType[] | []>;
  productDetails: Partial<ProductType | null>;
}
const initialState: IIniatialProductsState = {
  isLoading: false,
  error: false,
  successDelete: false,
  products: [],
  isSearch: false,
  productsSearch: [],
  productDetails: null,
};

const ProductReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.PRODUCT_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.GET_PRODUCT_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        products: action.payload.products,
      });
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        productDetails: action.payload.product,
      });
    case actionTypes.PRODUCT_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
      });
    case actionTypes.PRODUCT_SEARCH_START:
      return updateObject(state, {
        // productsSearch: [],
        isSearch: true,
      });
    case actionTypes.PRODUCT_SEARCH_SUCCESS:
      const reg = new RegExp(`${action.payload.productSearch}`, "gi");
      console.log(action.payload.productSearch);
      return updateObject(state, {
        productsSearch: state.products.filter((product) => {
          return product?.name.match(reg) || product?.description.match(reg);
        }),
      });
    case actionTypes.PRODUCT_SEARCH_RESET:
      return updateObject(state, {
        productsSearch: [],
        isSearch: false,
      });
    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return updateObject(state, {
        users: state.products?.filter(
          (product) => product?._id !== action.payload.productId
        ),
        successDelete: true,
      });
    default:
      return state;
  }
};

export default ProductReducer;
