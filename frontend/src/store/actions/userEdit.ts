import * as actionsTypes from "./actionsTypes";

import { addNotif } from "./notif";
import { applicationJson, IUser } from "../../types/types.models";
import axios from "axios";
import { store } from "../..";

export const userEditStart = () => {
  return {
    type: actionsTypes.USER_EDIT_START,
  };
};
export const userEditError = () => {
  return {
    type: actionsTypes.USER_EDIT_ERROR,
  };
};
export const userEditSuccess = (userEdit: IUser) => {
  return {
    type: actionsTypes.USER_EDIT_SUCCESS,
    payload: { userEdit: userEdit },
  };
};

export const getUserEditData = (id: string) => {
  return (dispatch: any) => {
    dispatch(userEditStart());
    axios
      .get(`/api/users/${id}`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(userEditSuccess(resp.data.user));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(addNotif("ERROR", errorSend));
        dispatch(userEditError());
        console.log(error);
      });
  };
};
