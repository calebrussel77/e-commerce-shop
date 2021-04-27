import * as actionsTypes from "./actionsTypes";

export const removeNotif = (id: string) => {
  return {
    type: actionsTypes.REMOVE_NOTIFICATION,
    payload: { id },
  };
};
export const addNotif = (type: string, msg: string) => {
  return {
    type: actionsTypes.ADD_NOTIFICATION,
    payload: { type, msg },
  };
};

export const displayNotif = (type: string, msg: string) => {
  return (dispatch: any) => {
    dispatch(addNotif(type, msg));
  };
};
