import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";
import { IUser } from "../../types/types.models";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(String(localStorage.getItem("userInfo")))
  : null;

const tokenFromLocalStorage = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

interface actionType {
  type: string;
  payload: any;
}

interface IIniatialUserState {
  isLoading: boolean;
  error: boolean;
  userInfo: Partial<IUser | null>;
  token: string;
  userDetails: Partial<IUser | null>;
}

const initialState: IIniatialUserState = {
  isLoading: false,
  error: false,
  userInfo: userInfoFromLocalStorage,
  token: String(tokenFromLocalStorage),
  userDetails: null,
};

const UserReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.USER_LOGIN_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        userInfo: action.payload.userInfo,
        token: action.payload.token,
      });

    case actionTypes.USER_DETAILS_RESET:
      return updateObject(state, {
        isLoading: false,
        userInfo: null,
        token: "",
        error: false,
        userDetails: null,
      });
    case actionTypes.USER_LOGIN_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
      });
    case actionTypes.USER_LOGOUT:
      return updateObject(state, {
        isLoading: false,
        userInfo: null,
        token: null,
      });
    case actionTypes.USER_REGISTER_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.USER_REGISTER_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
      });
    case actionTypes.USER_UPDATE_PROFILE_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.USER_UPDATE_PROFILE_RESET:
      return updateObject(state, {
        isLoading: false,
        userDetails: null,
      });
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        userDetails: {
          ...state.userDetails,
          ...action.payload.userDetails,
        },
        userInfo: {
          ...state.userInfo,
          ...action.payload.userDetails,
        },
      });
    case actionTypes.USER_UPDATE_PROFILE_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
      });
    case actionTypes.USER_DETAILS_START:
      return updateObject(state, {
        isLoading: true,
      });
    case actionTypes.USER_DETAILS_SUCCESS:
      return updateObject(state, {
        isLoading: false,
        userDetails: action.payload.userDetails,
      });
    case actionTypes.USER_DETAILS_ERROR:
      return updateObject(state, {
        isLoading: false,
        error: true,
      });
    default:
      return state;
  }
};

export default UserReducer;
