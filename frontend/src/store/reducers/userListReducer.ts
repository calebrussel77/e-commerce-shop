import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";
import { IUser } from "../../types/types.models";

interface actionType {
  type: string;
  payload: any;
}
interface IIniatialUserListState {
  users: Partial<IUser[] | []>;
  isLoading: boolean;
  error: boolean;
  successDelete: boolean;
}

const initialState: IIniatialUserListState = {
  users: [],
  isLoading: false,
  error: false,
  successDelete: false,
};

const UserListReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.USER_LIST_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.USER_LIST_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        users: action?.payload?.userList,
      });
    case actionTypes.USER_LIST_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
      });
    case actionTypes.USER_DELETE_SUCCESS:
      return updateObject(state, {
        users: state.users?.filter(
          (user) => user?._id !== action.payload.userId
        ),
        successDelete: true,
      });
    default:
      return state;
  }
};

export default UserListReducer;
