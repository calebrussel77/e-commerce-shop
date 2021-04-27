import * as actionsTypes from "./actionsTypes";

import { addNotif } from "./notif";
import { applicationJson, IUser } from "../../types/types.models";
import axios from "axios";
import { store } from "../..";

const userUpdateStart = () => {
  return {
    type: actionsTypes.USER_UPDATE_START,
  };
};
const userUpdateError = () => {
  return {
    type: actionsTypes.USER_UPDATE_ERROR,
  };
};
const userUpdateSuccess = () => {
  return {
    type: actionsTypes.USER_UPDATE_SUCCESS,
  };
};

export const updateUserData = (id: string, userInfo: Partial<IUser>) => {
  return (dispatch: any) => {
    dispatch(userUpdateStart());
    axios
      .put(`/api/users/${id}`, userInfo, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        if (resp?.data) {
          dispatch(userUpdateSuccess());
          dispatch(addNotif("SUCCESS", resp.data.msg));
        }
      })
      .catch((error) => {
        console.log(error);
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(userUpdateError());
      });
  };
};
