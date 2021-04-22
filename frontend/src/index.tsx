import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import notifReducer from "./store/reducers/notificationReducer";
import productReducer from "./store/reducers/productReducer";
import cartReducer from "./store/reducers/cartReducer";
import userReducer from "./store/reducers/userReducer";
import orderReducer from "./store/reducers/orderReducer";
import orderPayReducer from "./store/reducers/orderPayReducer";
import userOrdersReducer from "./store/reducers/userOrdersReducer";
import userListReducer from "./store/reducers/userListReducer";
import userEditReducer from "./store/reducers/userEditReducer";
import userUpdateReducer from "./store/reducers/userUpdateReducer";
import productCreateReducer from "./store/reducers/productCreateReducer";
import productUpdateReducer from "./store/reducers/productUpdateReducer";
import orderListReducer from "./store/reducers/orderListReducer";
import orderDeliverReducer from "./store/reducers/orderDeliverReducer";
import productCreateReviewReducer from "./store/reducers/productCreateReviewReducer";
import productRatingTopReducer from "./store/reducers/productRatingTopReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  product: productReducer,
  notif: notifReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  orderPay: orderPayReducer,
  userOrders: userOrdersReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userEdit: userEditReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  productCreateReview: productCreateReviewReducer,
  productRatingTop: productRatingTopReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
