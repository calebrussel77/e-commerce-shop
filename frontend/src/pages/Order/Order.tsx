import { connect } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fr";

import * as actions from "../../store/actions/index";
import {
  applicationJson,
  ICartItem,
  IOrder,
  IPaymentResult,
  IState,
  IUser,
} from "../../types/types.models";
import PaypalSvg from "../../assets/svgs/Paypal.svg";
import StripeSvg from "../../assets/svgs/Stripe.svg";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import { store } from "../..";

const Order = (props: {
  onGetOrderDetails: (orderId: string) => void;
  onOrderDeliver: (orderId: string) => void;
  onPayOrder: (orderId: string, paymentResult: IPaymentResult) => void;
  orderDetails: any;
  orderItem: Partial<IOrder>;
  userInfo: IUser;
  isLoading: boolean;
  isLoadingPay: boolean;
  successPay: boolean;
  successDeliver: boolean;
  history: any;
  onPayOrderReset: () => void;
  match: any;
}) => {
  const {
    onGetOrderDetails,
    isLoading,
    orderDetails,
    match,
    successPay,
    isLoadingPay,
    orderItem,
    onPayOrderReset,
    onPayOrder,
    userInfo,
    onOrderDeliver,
    successDeliver,
  } = props;
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    Number(
      orderDetails?.orderItems
        ?.reduce(
          (prevValue: number, currValue: ICartItem) =>
            prevValue + currValue.qty! * currValue.price!,
          0
        )
        .toFixed(2)
    )
  );

  useEffect(() => {
    onGetOrderDetails(orderId);
  }, [onGetOrderDetails, orderId]);

  const deliverHandle = () => {
    onOrderDeliver(String(orderDetails._id));
  };

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal", {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": applicationJson,
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      });

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!orderItem || successPay || successDeliver) {
      onPayOrderReset();
      onGetOrderDetails(orderId);
    } else if (!orderItem.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
        console.log("salut");
      } else {
        setSdkReady(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
  }, [
    onGetOrderDetails,
    successPay,
    orderId,
    orderItem,
    onPayOrderReset,
    successDeliver,
  ]);

  const successPaymentHandler = async (data: any, actions: any) => {
    // Capture the funds from the transaction
    return actions.order.capture().then(function (details: any) {
      // Show a success message to your buyer
      onPayOrder(orderId, {
        id: details.id,
        status: details.status,
        email_address: details.payer.email_address,
        update_time: details.update_time,
      });
    });
  };
  const createOrderPayment = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: orderDetails?.totalPrice?.toFixed(2),
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING", // default is "GET_FROM_FILE"
      },
    });
  };

  isLoading && (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 mt-10">
      <Spinner />
    </div>
  );

  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row md:space-x-6 items-start">
      <div className=" flex-1">
        <span
          onClick={() => props?.history?.goBack()}
          className="cursor-pointer p-2 inline-flex items-center text-pink-500 hover:bg-pink-100 rounded-md font-semibold space-x-1"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span>Retour</span>
        </span>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-2">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-medium text-gray-900">
              Informations sur l'acheteur
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Vérifiez vos informations ci-dessous.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Acheteur</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-x-1">
                  <div className="flex flex-row space-x-3 items-center">
                    <div>
                      <img
                        src={orderDetails?.user?.image}
                        alt={orderDetails?.user?.name}
                        className="h-10 w-10 rounded-md shadow-md"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-gray-700 text-sm font-semibold">
                        {orderDetails?.user?.name}
                      </span>
                      <span className="text-gray-700 text-sm">
                        <a
                          className="hover:underline"
                          href={`mailto:${orderDetails?.user?.email}`}
                        >
                          {orderDetails?.user?.email}
                        </a>
                      </span>
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-3">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-medium text-gray-900">
              Details de l'achat
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details du processus d'achat de vos articles.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Adresse de Livraison
                </dt>
                <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2 space-x-1">
                  <span>{orderDetails?.shippingAddress?.address}</span>,
                  <span>{orderDetails?.shippingAddress?.city}</span>,
                  <span>{orderDetails?.shippingAddress?.country}</span>,
                  <span>{orderDetails?.shippingAddress?.postalCode}</span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Methode de Payement
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {orderDetails?.paymentMethod?.toString() === "Paypal" && (
                    <div className="inline-flex space-x-1 items-center">
                      <img
                        src={PaypalSvg}
                        className="h-9 w-auto"
                        alt="Paypal"
                      />
                    </div>
                  )}
                  {orderDetails?.paymentMethod?.toString() === "Stripe" && (
                    <div className="inline-flex space-x-1 items-center">
                      <img
                        src={StripeSvg}
                        className="h-9 w-auto"
                        alt="Paypal"
                      />
                    </div>
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Produits commandés
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {orderDetails?.orderItems?.length === 0 ? (
                    "Votre commande est vide"
                  ) : (
                    <div className="flex flex-col flex-wrap -mx-3 space-y-4">
                      {orderDetails?.orderItems?.map((orderItem: ICartItem) => {
                        return (
                          <div
                            key={orderItem.product}
                            className="inline-flex space-x-3 items-center"
                          >
                            <img
                              src={orderItem.image}
                              alt={orderItem.name}
                              className="h-10 w-10 rounded-md shadow-md"
                            />
                            <Link
                              to={`/product/${orderItem.product}`}
                              className="text-base text-gray-600 font-semibold hover:underline"
                            >
                              {orderItem.name}
                            </Link>
                            <span className="text-base">
                              {orderItem.qty} x {orderItem.price} ={" "}
                              <span className="font-semibold text-gray-500">
                                {" "}
                                {(orderItem?.qty! * orderItem?.price!).toFixed(
                                  2
                                )}{" "}
                                frs
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </dd>
              </div>
              <div
                className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                  orderDetails?.isPaid
                    ? "bg-green-100 text-green-600 font-bold"
                    : "bg-red-100 text-red-600 font-bold"
                } `}
              >
                <dt className="text-sm font-medium">Etat de Payement :</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  {orderDetails?.isPaid
                    ? `Payé le ${moment(orderDetails.paidAt)
                        .locale("fr")
                        .format("ll")} `
                    : "Non Payé"}
                </dd>
              </div>
              <div
                className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                  orderDetails?.isDelivered
                    ? "bg-green-100 text-green-600 font-bold border-t border-green-100"
                    : "bg-red-100 text-red-600 font-bold border-t border-red-100"
                } `}
              >
                <dt className="text-sm font-medium">Etat de livraison :</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  {orderDetails?.isDelivered
                    ? `Livré le ${moment(orderDetails.deliveredAt)
                        .locale("fr")
                        .format("ll")} `
                    : "Non Livré"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg w-1/3">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl leading-6 font-medium text-gray-900">
            Récapitulatif de vos commandes
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Consultez ci-dessous le recapitulatif de vos commandes.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Prix des Produits
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 space-x-1">
                {itemsPrice} frs
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Prix de la livraison
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {orderDetails?.shippingPrice} frs
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">TVA / Tax</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {orderDetails?.taxPrice} frs (19,25 %)
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-800">Prix Total</dt>
              <dd className="mt-1 text-gray-800 font-bold sm:mt-0 sm:col-span-2">
                {orderDetails?.totalPrice?.toFixed(2)} frs
              </dd>
            </div>
          </dl>
        </div>
        <div className="bg-gray-50">
          {!orderItem.isPaid && (
            <div className="p-6">
              {isLoadingPay && <Spinner />}

              {!sdkReady ? (
                <Spinner />
              ) : !orderDetails?.isPaid ? (
                <PayPalButton
                  createOrder={createOrderPayment}
                  onApprove={successPaymentHandler}
                  onError={(err: any) => console.log("ERROR", err)}
                />
              ) : userInfo.isAdmin &&
                orderDetails?.isPaid &&
                !orderDetails?.isDelivered ? (
                <button
                  className="btn w-full inline-flex space-x-3 items-center justify-center font-semibold"
                  onClick={deliverHandle}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                  <span>Marqué comme livré</span>
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    orderDetails: state.order.orderDetails,
    orderItem: state.order.orderItem,
    userInfo: state.user.userInfo,
    success: state.order.success,
    isLoading: state.order.isLoading,
    successPay: state.orderPay.success,
    successDeliver: state.orderDeliver.success,
    isLoadingPay: state.orderPay.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetOrderDetails: (orderId: string) =>
      dispatch(actions.getOrderDetails(orderId)),
    onPayOrder: (orderId: string, paymentResult: IPaymentResult) =>
      dispatch(actions.payOrder(orderId, paymentResult)),
    onOrderDeliver: (orderId: string) =>
      dispatch(actions.deliverOrder(orderId)),
    onPayOrderReset: () => dispatch(actions.payOrderReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
