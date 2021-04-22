/* eslint-disable no-restricted-globals */
import { connect } from "react-redux";
import moment from 'moment';
import 'moment/locale/fr';

import * as actions from "../../store/actions/index";
import { IOrder, IState, IUser } from "../../types/types.models";
import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

const OrdersList = (props: {
  onGetOrdersList: () => void;
  isLoading: boolean;
  orders: IOrder[];
}) => {
  const { onGetOrdersList, orders, isLoading } = props;

  useEffect(() => {
    onGetOrdersList();
  }, [onGetOrdersList]);

  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-row justify-between items-center">
        <h4 className="mb-4 text-lg font-semibold tracking-wide text-gray-900 uppercase">
          Liste des Commandes
        </h4>
      </div>

      {isLoading && <Spinner />}

      <div className="w-full overflow-hidden rounded-lg shadow-xs mt-6">
        {orders && orders?.length > 0 && (
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Commanditaire</th>
                  <th className="px-4 py-3">Payé</th>
                  <th className="px-4 py-3">Livré</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Montant total</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {orders?.map((order) => {
                  return (
                    <tr
                      key={order?._id}
                      className="text-gray-700 dark:text-gray-400"
                    >
                      <td className="pl-2 pr-4 py-4 text-sm">
                        <p className="text-sm text-gray-800 dark:text-gray-400 text-center">
                          {order?._id}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center text-sm">
                          <div className="relative hidden w-8 h-8 mr-3 rounded-md md:block">
                            <img
                              className="object-cover w-full h-full rounded-md"
                              src={order?.user?.image}
                              alt={order?.user?.name}
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p className="font-semibold">{order?.user?.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 w-56 truncate">
                              {order?.user?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs">
                        <span
                          className={`px-2 py-1 font-semibold leading-tight rounded-full dark:bg-green-700 whitespace-nowrap ${
                            order?.isPaid
                              ? "text-green-500 bg-green-50 "
                              : "text-red-600 bg-red-50  "
                          } `}
                        >
                          {order?.isPaid
                            ? moment(order?.paidAt).locale("fr").format("ll")
                            : "Non Payé"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs">
                        <span
                          className={`px-2 py-1 font-semibold leading-tight rounded-full dark:bg-green-700 whitespace-nowrap ${
                            order?.isDelivered
                              ? "text-green-600 bg-green-50 "
                              : "text-red-600 bg-red-50  "
                          } `}
                        >
                          {order?.isDelivered
                            ? moment(order?.deliveredAt)
                                .locale("fr")
                                .format("ll")
                            : "Non Livré"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {moment(order?.createdAt).locale("fr").format("ll")}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap font-semibold">
                        {order?.totalPrice.toFixed(2)} frs
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-4 text-sm">
                          <Link
                            to={`/order/${order._id}`}
                            className="btn text-xs p-2"
                          >
                            Voir les details
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="grid px-4 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
          <span className="flex items-center col-span-3">
            {`Montrant ${isLoading ? "chargement..." : orders?.length} sur ${
              isLoading ? "loading..." : orders?.length
            }`}
          </span>
          <span className="col-span-2"></span>
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end"></span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isLoading: state.orderList.isLoading,
    orders: state.orderList.orders,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetOrdersList: () => dispatch(actions.getOrdersList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersList);
