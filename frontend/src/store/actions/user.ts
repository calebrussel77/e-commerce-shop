import axios from "axios";
import { store } from "../..";
import { applicationJson, IUser } from "../../types/types.models";

import * as actionsTypes from "./actionsTypes";
import { addNotif } from "./notif";

/** LOGGING actions */
export const userLoggingStart = () => {
  return {
    type: actionsTypes.USER_LOGIN_START,
  };
};

export const userLoggingError = () => {
  return {
    type: actionsTypes.USER_LOGIN_ERROR,
  };
};

export const userAuthSuccess = (token: string, user: IUser) => {
  return {
    type: actionsTypes.USER_LOGIN_SUCCESS,
    payload: {
      userInfo: user,
      token,
    },
  };
};

export const userAuthSignIn = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(userLoggingStart());
    axios
      .post(
        "/api/users/login",
        { email, password },
        {
          baseURL: process.env.REACT_APP_BASE_URL,
          headers: {
            "content-type": applicationJson,
            Authorization: `Bearer ${store?.getState()?.user?.token}`,
          },
        }
      )
      .then((resp) => {
        dispatch(
          userAuthSuccess(resp.data.userLoggedIn.token, resp.data.userLoggedIn)
        );
        dispatch(addNotif("SUCCESS", resp.data.msg));
        localStorage.setItem("token", resp.data.userLoggedIn.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(store.getState().user.userInfo)
        );
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(userLoggingError());
        dispatch(addNotif("ERROR", errorSend));
      });
  };
};

export const removeUserInfo = () => {
  return {
    type: actionsTypes.USER_LOGOUT,
  };
};
export const removeUserDetails = () => {
  return {
    type: actionsTypes.USER_DETAILS_RESET,
  };
};
export const removeUserOrders = () => {
  return {
    type: actionsTypes.USER_ORDERS_RESET,
  };
};
export const resetCartItems = () => {
  return {
    type: actionsTypes.CART_ITEM_RESET,
  };
};

export const loggedOutUser = () => {
  return (dispatch: any) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("cartItems");
    dispatch(resetCartItems());
    dispatch(removeUserInfo());
    dispatch(removeUserDetails());
    dispatch(removeUserOrders());
  };
};

/** REGISTER actions */

export const userRegisterStart = () => {
  return {
    type: actionsTypes.USER_REGISTER_START,
  };
};

export const userRegisterError = () => {
  return {
    type: actionsTypes.USER_REGISTER_ERROR,
  };
};

export const registerUser = (name: string, email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(userRegisterStart());
    axios
      .post(
        "/api/users/register",
        { name, email, password },
        {
          baseURL: process.env.REACT_APP_BASE_URL,
          headers: {
            "content-type": applicationJson,
            Authorization: `Bearer ${store?.getState()?.user?.token}`,
          },
        }
      )
      .then((resp) => {
        dispatch(
          userAuthSuccess(
            resp.data.userRegistered.token,
            resp.data.userRegistered
          )
        );
        dispatch(addNotif("SUCCESS", resp.data.msg));
        localStorage.setItem("token", resp.data.userRegistered.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(store.getState().user.userInfo)
        );
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(userRegisterError());
        dispatch(addNotif("ERROR", errorSend));
      });
  };
};

/** USER UPDATE PROFIL actions */
export const userUpdateProfilStart = () => {
  return {
    type: actionsTypes.USER_UPDATE_PROFILE_START,
  };
};

export const userUpdateProfilError = () => {
  return {
    type: actionsTypes.USER_UPDATE_PROFILE_ERROR,
  };
};

export const userUpdateProfilSuccess = (updatedProfile: IUser) => {
  return {
    type: actionsTypes.USER_UPDATE_PROFILE_SUCCESS,
    payload: { userDetails: updatedProfile },
  };
};

export const UpdateUserProfil = (userUpdateInfo: Partial<IUser>) => {
  return (dispatch: any) => {
    dispatch(userUpdateProfilStart());
    axios
      .put(`/api/users/profile`, userUpdateInfo, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(userUpdateProfilSuccess(resp.data.updatedProfile));
        dispatch(addNotif("SUCCESS", resp.data.msg));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...store.getState().user.userInfo,
            ...resp.data.updatedProfile,
          })
        );
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(userUpdateProfilError());
        dispatch(addNotif("ERROR", errorSend));
      });
  };
};

/** USER DETAILS actions */
export const userDetailsStart = () => {
  return {
    type: actionsTypes.USER_DETAILS_START,
  };
};

export const userDetailsError = () => {
  return {
    type: actionsTypes.USER_DETAILS_ERROR,
  };
};

export const userDetailsSuccess = (userProfile: IUser) => {
  return {
    type: actionsTypes.USER_DETAILS_SUCCESS,
    payload: { userDetails: userProfile },
  };
};

export const resetUserProfile = () => {
  return {
    type: actionsTypes.USER_UPDATE_PROFILE_RESET,
  };
};

export const getUserdetails = (id: string) => {
  //id can be the Profile to access user profile or the id of the
  //user to access the user info

  return (dispatch: any) => {
    dispatch(userDetailsStart());
    axios
      .get(`/api/users/${id}`, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      })
      .then((resp) => {
        dispatch(userDetailsSuccess(resp.data.userProfile));
        // dispatch(addNotif("SUCCESS", resp.data.msg));
      })
      .catch((error) => {
        const errorSend =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(userDetailsError());
        dispatch(addNotif("ERROR", errorSend));
      });
  };
};
