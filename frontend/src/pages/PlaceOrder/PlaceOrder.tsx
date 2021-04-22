import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { ICartItem, IShippingAddress, IState } from "../../types/types.models";
import CheckoutStep from "../../components/CheckoutStep/CheckoutStep";
import PaypalSvg from "../../assets/svgs/Paypal.svg";
import StripeSvg from "../../assets/svgs/Stripe.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const PlaceOrder = (props: {
  shippingAddress: IShippingAddress;
  cartItems: ICartItem[];
  paymentMethodProps: string;
  onCreateOrderItem: (order: any) => void;
  orderItem: any;
  success: boolean;
  isLoading: boolean;
  history: any;
}) => {
  const {
    shippingAddress,
    cartItems,
    paymentMethodProps,
    onCreateOrderItem,
    isLoading,
    orderItem,
    success,
    history,
  } = props;

  useEffect(() => {
    if (success) {
      history.push(`/order/${orderItem._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, history]);

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    Number(
      cartItems
        .reduce(
          (prevValue, currValue) =>
            prevValue + currValue.qty! * currValue.price!,
          0
        )
        .toFixed(2)
    )
  );
  const shippingPrice = addDecimals(Number(itemsPrice) > 2000 ? 0 : 1000);
  const taxPrice = addDecimals(Number((0.19 * Number(itemsPrice)).toFixed(2)));
  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  const placeOrderHandler = () => {
    onCreateOrderItem({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod: paymentMethodProps,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
  };
  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      {/* we give the older and current step we are */}
      <CheckoutStep step1 step2 step3 step4 />

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                <span>{shippingAddress.address}</span>,
                <span>{shippingAddress.city}</span>,
                <span>{shippingAddress.country}</span>,
                <span>{shippingAddress.postalCode}</span>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Methode de Payement
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {paymentMethodProps === "Paypal" ? (
                  <div className="inline-flex space-x-1 items-center">
                    <img src={PaypalSvg} className="h-9 w-auto" alt="Paypal" />
                  </div>
                ) : (
                  <div className="inline-flex space-x-1 items-center">
                    <img src={StripeSvg} className="h-9 w-auto" alt="Paypal" />
                  </div>
                )}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Produits commandés
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {cartItems.length === 0 ? (
                  "Votre pannier est vide"
                ) : (
                  <div className="flex flex-col flex-wrap -mx-3 space-y-4">
                    {cartItems.map((cartItem) => {
                      return (
                        <div
                          key={cartItem.product}
                          className="inline-flex space-x-3 items-center"
                        >
                          <img
                            src={cartItem.image}
                            alt={cartItem.name}
                            className="h-10 w-10 rounded-md shadow-md"
                          />
                          <Link
                            to={`/product/${cartItem.product}`}
                            className="text-base text-gray-600 font-semibold hover:underline"
                          >
                            {cartItem.name}
                          </Link>
                          <span className="text-base">
                            {cartItem.qty} x {cartItem.price} ={" "}
                            <span className="font-semibold text-pink-500">
                              {" "}
                              {(cartItem?.qty! * cartItem?.price!).toFixed(
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
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg max-w-md mt-3">
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
                {shippingPrice} frs
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">TVA / Tax</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {taxPrice} frs (19,25 %)
              </dd>
            </div>
            <div className="bg-pink-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-pink-500">Prix Total</dt>
              <dd className="mt-1 text-sm text-pink-500 font-bold sm:mt-0 sm:col-span-2">
                {totalPrice.toFixed(2)} frs
              </dd>
            </div>
            <div className="m-3">
              <button
                disabled={isLoading}
                onClick={placeOrderHandler}
                className={`btn w-full inline-flex justify-center items-center space-x-2 shadow-lg ${
                  isLoading
                    ? "opacity-50 hover:opacity-50 cursor-not-allowed hover:bg-current"
                    : "hover:bg-pink-700 "
                }`}
              >
                {isLoading ? (
                  <span className="flex flex-row space-x-2 items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>patientez...</span>
                  </span>
                ) : (
                  <>
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span> Passer la commande</span>
                  </>
                )}
              </button>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    shippingAddress: state.cart.shippingAddress,
    cartItems: state.cart.cartItems,
    paymentMethodProps: state.cart.paymentMethod,
    orderItem: state.order.orderItem,
    success: state.order.success,
    isLoading: state.order.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSaveShippingAddress: (data: IShippingAddress) =>
      dispatch(actions.saveShippingAddress(data)),
    onCreateOrderItem: (order: any) => dispatch(actions.createOrderItem(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
