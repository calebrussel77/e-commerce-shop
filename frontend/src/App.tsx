import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Notification from "./components/Notification/Notification";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import { connect } from "react-redux";

import { IState, INotification } from "./types/types.models";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Shipping from "./pages/Shipping/Shipping";
import Payment from "./pages/Payment/Payment";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Order from "./pages/Order/Order";
import UsersList from "./pages/UsersList/UsersList";
import UserEdit from "./pages/UserEdit/UserEdit";
import ProductsList from "./pages/ProductsList/ProductsList";
import ProductEdit from "./pages/ProductEdit/ProductEdit";
import OrdersList from "./pages/OrdersList/OrdersList";

const App = (props: {
  isAuthenticated: boolean;
  isAdmin: boolean;
  notifications: INotification[];
  location: any;
  history: any;
}) => {
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  let routes = (
    <Switch>
      {/* Public Routes */}
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route path="/product/:id" component={Product} />
      <Route path="/cart/:id?" component={Cart} />
      <Route exact path="/order/:id" component={Order} />

      {/* Protected if Users Authenticated Routes */}
      <Route exact path="/login" component={Login}>
        {props.isAuthenticated ? <Redirect to={redirect} /> : null}
      </Route>
      <Route exact path="/register" component={Register}>
        {props.isAuthenticated ? <Redirect to={redirect} /> : null}
      </Route>

      {/* Authenticated Users Routes */}
      <Route exact path="/shipping" component={Shipping}>
        {!props.isAuthenticated ? <Redirect to="/login" /> : null}
      </Route>
      <Route exact path="/payment" component={Payment}>
        {!props.isAuthenticated ? <Redirect to="/login" /> : null}
      </Route>
      <Route exact path="/placeorder" component={PlaceOrder}>
        {!props.isAuthenticated ? <Redirect to="/login" /> : null}
      </Route>
      <Route path="/profile" component={Profile}>
        {!props.isAuthenticated ? <Redirect to="/login" /> : null}
      </Route>

      {/* Admin Users Routes */}
      <Route exact path="/admin/products" component={ProductsList}>
        {!props.isAuthenticated || !props.isAdmin ? (
          <Redirect to="/login" />
        ) : null}
      </Route>
      <Route exact path="/admin/product/:id/edit" component={ProductEdit}>
        {!props.isAuthenticated || !props.isAdmin ? (
          <Redirect to="/login" />
        ) : null}
      </Route>
      <Route exact path="/admin/users" component={UsersList}>
        {!props.isAuthenticated || !props.isAdmin ? (
          <Redirect to="/login" />
        ) : null}
      </Route>
      <Route exact path="/admin/user/:id/edit" component={UserEdit}>
        {!props.isAuthenticated || !props.isAdmin ? (
          <Redirect to="/login" />
        ) : null}
      </Route>
       <Route exact path="/admin/orders" component={OrdersList}>
        {!props.isAuthenticated || !props.isAdmin ? (
          <Redirect to="/login" />
        ) : null}
      </Route>
    </Switch>
  );
  return (
    <Layout>
      {props.notifications.length > 0 ? <Notification /> : null}
      {routes}
    </Layout>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isAuthenticated: state.user.token ? true : false,
    isAdmin: state.user.userInfo && state.user.userInfo.isAdmin ? true : false,
    notifications: state.notif.notifications,
  };
};

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     onGetProductList: () => dispatch(actions.getProductsList()),
//   };
// };

export default withRouter(connect(mapStateToProps)(App));
