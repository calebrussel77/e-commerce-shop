import * as actionsTypes from "./actionsTypes";

import { addNotif } from "./notif";
import { applicationJson, IUser } from "../../types/types.models";
import axios from "axios";
import { store } from "../..";

export const userLiStart = () => {
  return {
    type: actionsTypes.USER_LIST_START,
  };
};
export const userListError = () => {
  return {
    type: actionsTypes.USER_LIST_ERROR,
  };
};

export const userListSuccess = (userList: IUser[]) => {
  return {
    type: actionsTypes.USER_LIST_SUCCESS,
    payload: { userList },
  };
};

export const userDeleteSuccess = (userId: string) => {
  return {
    type: actionsTypes.USER_DELETE_SUCCESS,
    payload: { userId },
  };
};

export const getUserList = () => {
  return (dispatch: any) => {
    dispatch(userLiStart());
    axios
      .get(`/api/users`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(userListSuccess(resp.data.userList));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(userListError());
        console.log(error);
      });
  };
};

export const deleteUserById = (userId: string) => {
  return (dispatch: any) => {
    axios
      .delete(`/api/users/${userId}`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(userDeleteSuccess(userId));
        dispatch(addNotif("SUCCESS", resp.data.msg));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        console.log(error);
      });
  };
};
