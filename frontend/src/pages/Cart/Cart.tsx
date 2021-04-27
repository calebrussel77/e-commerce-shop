import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { IState, ICartItem } from "../../types/types.models";
import * as actions from "../../store/actions/index";
import NotFound from "../../components/NotFound/NotFound";

const Cart = (props: {
  match: any;
  location: any;
  history: any;
  onAddToCart: (product: string, qty: number) => void;
  onRemoveToCart: (id: string) => void;
  cartItems: ICartItem[];
  isLoading: boolean;
}) => {
  const product = props?.match?.params?.id;
  const qty = props?.location?.search
    ? Number(props?.location?.search.split("=")[1])
    : 1;

  useEffect(() => {
    if (product) {
      props.onAddToCart(product, qty);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, qty]);

  const CustomCartSelect = (dataProps: { item: any }) => {
    const newCountArray: number[] = Array.from(
      Array(dataProps?.item.countInStock).keys()
    );

    return (
      <select
        className="w-full rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-pink-500"
        name="qty"
        value={dataProps.item.qty}
        onChange={(e) =>
          props.onAddToCart(dataProps.item.product, Number(e.target.value))
        }
      >
        {newCountArray.map((x) => {
          return (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          );
        })}
      </select>
    );
  };

  const handleRemoveCartItem = (id: string) => {
    props.onRemoveToCart(id);
  };

  const handleCheckout = () => {
    props.history.push(`/login?redirect=shipping`);
  };

  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      {props.cartItems.length ? (
        <div className="mb-4">
          <span
            onClick={() => props.history.goBack()}
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
        </div>
      ) : null}
      <div className="border-b border-gray-200 mb-8">
        <div className="inline-flex items-center space-x-2 text-gray-600 ">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          <span className="text-base font-bold leading-8 tracking-tight sm:text-xl sm:leading-10 py-4 ">
            Votre pannier d'achat
          </span>
        </div>
      </div>
      {!props.cartItems.length && (
        <NotFound>
          <p className=" text-gray-600">
            Votre pannier est vide.{" "}
            <span
              onClick={() => props.history.goBack()}
              className="cursor-pointer font-bold text-gray-600 hover:underline"
            >
              Revenir en arrière
            </span>
          </p>
        </NotFound>
      )}

      <div className="flex items-start space-x-10">
        <div className="w-full divide-y divide-gray-200">
          {props.cartItems.map((item) => {
            return (
              <div
                key={item.product}
                className="flex items-center py-6 space-x-8 text-gray-600 transition ease-in-out duration-150"
              >
                <div className="shadow-md overflow-hidden rounded w-52">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover object-center"
                  />
                </div>

                <div className="flex-1 flex items-center space-x-8">
                  <div className="space-y-3 flex-1">
                    <p className="font-bold text-lg hover:underline">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </p>
                    <p className="text-pink-500 font-semibold">
                      {item.price} frs
                    </p>
                  </div>
                  <div className="w-40">
                    <CustomCartSelect item={item} />
                  </div>
                  <div
                    onClick={() => handleRemoveCartItem(item.product)}
                    className="p-2 rounded-lg hover:bg-red-100 cursor-pointer"
                  >
                    <svg
                      className="w-7 h-7 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {props.cartItems && props.cartItems.length > 0 ? (
          <div className="w-72 text-gray-600">
            <h2 className="font-bold">
              Quantité total de produits :{" "}
              <span className="text-pink-600">
                {props.cartItems?.reduce(
                  (prevItem, currentItem) => prevItem + currentItem.qty!,
                  0
                )}
              </span>
            </h2>
            <p className="pt-1 font-bold">
              Prix :{" "}
              <span className="text-pink-600">
                {props.cartItems
                  ?.reduce(
                    (prevItem, currentItem) =>
                      prevItem + currentItem.qty! * currentItem.price!,
                    0
                  )
                  .toFixed(2)}{" "}
                frs
              </span>
            </p>
            <button
              onClick={handleCheckout}
              className={`animate-bounce btn mt-4 w-full justify-center items-center space-x-2 ${
                props.cartItems?.length === 0
                  ? "opacity-40 hover:opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={props.cartItems?.length === 0}
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span>Procéder au payement</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    // isLoading: state.cart.isLoading,
    // error: state.cart.error,
    cartItems: state.cart.cartItems,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddToCart: (product: string, qty: number) => {
      return dispatch(actions.addToCart(product, qty));
    },
    onRemoveToCart: (id: string) => {
      return dispatch(actions.removeToCart(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
