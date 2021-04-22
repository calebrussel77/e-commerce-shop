import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";
import { IUser } from "../../types/types.models";

interface actionType {
  type: string;
  payload: any;
}

interface IIniatialUserState {
  isLoading: boolean;
  error: boolean;
  userEdit: Partial<IUser | null>;
}

const initialState: IIniatialUserState = {
  isLoading: false,
  error: false,
  userEdit: null,
};

const userEditReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.USER_EDIT_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.USER_EDIT_SUCCESS:
      return updateObject(state, {
        userEdit: action?.payload?.userEdit,
        isLoading: false,
      });
    case actionTypes.USER_EDIT_ERROR:
      return updateObject(state, {
        isLoading: false,
      });

    default:
      return state;
  }
};

export default userEditReducer;
