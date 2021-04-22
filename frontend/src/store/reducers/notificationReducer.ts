import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "../../utils/updateObject";
import { v4 } from "uuid";
import { INotification } from "../../types/types.models";

interface actionType {
  type: string;
  payload: any;
}

const initialState = {
  notifications: [],
};

const NotificationReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case actionTypes.ADD_NOTIFICATION:
      return updateObject(state, {
        notifications: [
          ...state.notifications,
          {
            id: v4(),
            type: action.payload.type,
            msg: action.payload.msg,
          },
        ],
      });
    case actionTypes.REMOVE_NOTIFICATION:
      return updateObject(state, {
        notifications: state.notifications.filter((notif: INotification) => {
          return notif.id !== action.payload.id;
        }),
      });
    default:
      return state;
  }
};

export default NotificationReducer;
