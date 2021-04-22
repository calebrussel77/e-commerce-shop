import React, { useState } from "react";
import { connect } from "react-redux";
import { INotification, IState } from "../../types/types.models";
import * as actions from "../../store/actions/index";

const Notification = (props: any) => {
  const [exit, setExit] = useState(false);

  const handleCloseNotification = (id: string) => {
    setExit(true);
    props.onRemoveNotif(id);
  };

  return (
    <div
      style={{ zIndex: 10000000000 }}
      className="fixed bottom-3 sm:bottom-5 sm:right-3 sm:px-0 sm:w-96 w-full px-2 "
    >
      {props.notifs &&
        props.notifs.map((notif: INotification) => {
          return (
            <div
              key={notif.id}
              className={`notification-item bg-white shadow-lg rounded-lg mb-3 ${
                exit ? "exit" : ""
              }`}
            >
              <div className="rounded-lg shadow-xs overflow-hidden">
                <div
                  className={`h-1 rounded-lg ${
                    notif.type === "SUCCESS"
                      ? "bg-green-600 "
                      : notif.type === "INFO"
                      ? "bg-yellow-500"
                      : "bg-red-600"
                  }`}
                  style={{ width: `100%` }}
                />
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {notif.type === "SUCCESS" ? (
                        <div className="inline-flex items-center bg-green-600 p-2 text-white text-sm rounded-full flex-shrink-0">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      ) : notif.type === "INFO" ? (
                        <div className="inline-flex items-center bg-yellow-500 p-2 text-white text-sm rounded-full flex-shrink-0">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="inline-flex items-center bg-red-600 p-2 text-white text-sm rounded-full flex-shrink-0">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="mt-1 text-sm leading-5 text-gray-600">
                        {notif.msg}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        onClick={() => handleCloseNotification(notif.id)}
                        className="cursor-pointer inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    notifs: state.notif.notifications,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRemoveNotif: (id: string) => dispatch(actions.removeNotif(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
