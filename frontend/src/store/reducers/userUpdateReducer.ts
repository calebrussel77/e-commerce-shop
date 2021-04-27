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

const UserUpdateReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.USER_UPDATE_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.USER_UPDATE_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        success: true,
      });
    case actionTypes.USER_UPDATE_ERROR:
      return updateObject(state, {
        isLoading: false,
      });
    default:
      return state;
  }
};

export default UserUpdateReducer;
