import { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/fr";

import Rating from "../../components/Rating/Rating";
import { IReview, IState, IUser, ProductType } from "../../types/types.models";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import NotFound from "../../components/NotFound/NotFound";
import AlertBanner from "../../components/UI/AlertBanner/AlertBanner";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import SeoMetaTags from "../../components/SeoMetaTags/SeoMetaTags";

const Product = (props: {
  match: any;
  history: any;
  productDetails: ProductType;
  onGetProductDetails: (productID: string) => void;
  onProductReviewReset: () => void;
  error: boolean;
  isLoading: boolean;
  successCreateReview: boolean;
  userInfo: IUser;
}) => {
  const productId = props?.match?.params?.id;
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (props.successCreateReview) {
      props.onProductReviewReset();
    }
    props.onGetProductDetails(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, props.successCreateReview]);

  const CustomSelect = () => {
    // creates a new array according to the number
    const countArray: number[] = Array.from(
      Array(props.productDetails?.countInStock).keys()
    );

    return (
      <select
        className="w-full rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-pink-500"
        name="qty"
        value={qty}
        id="qtyId"
        onChange={(e) => setQty(Number(e.target.value))}
      >
        {countArray.map((x) => {
          return (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          );
        })}
      </select>
    );
  };

  const handleAddToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      {props.error && (
        <Error>Une erreur est survenue veuillez recharger la page.</Error>
      )}

      <SeoMetaTags title={props.productDetails?.name} />

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

      {props.isLoading && (
        <div className="mt-10 w-full">
          <Spinner />
        </div>
      )}
      <div className="mt-10 max-w-xl mx-auto flex-col space-x-0 space-y-3 md:flex md:max-w-none md:mx-0 md:flex-row md:space-y-0 md:items-start md:space-x-4">
        <div className="lg:flex-1 lg:flex items-start space-y-3 lg:space-y-0 lg:space-x-4">
          <div className="shadow-md overflow-hidden rounded h-80 w-96">
            <img
              src={props.productDetails?.image}
              alt={props.productDetails?.name}
              className="object-cover object-center h-full w-full"
            />
          </div>
          <div className="flex flex-col space-y-3 divide-y divide-gray-100">
            <h1 className="text-gray-900 text-xl mb-3 leading-7">
              {props.productDetails?.name}
            </h1>
            <p className="inline-flex items-center">
              <span className="text-gray-600 text-base max-w-lg">
                {props.productDetails?.description}
              </span>
            </p>
            <Rating
              value={props.productDetails?.rating!}
              text={`${props.productDetails?.numReviews} commentaires`}
            />
            <p className="inline-flex items-center text-gray-800 text-lg space-x-2">
              <span>prix :</span>
              <span className="">{props.productDetails?.price} Frs</span>
            </p>
          </div>
        </div>
        <div className="w-60">
          <div className="w-full rounded">
            <table className="w-full table-auto">
              <tbody className="text-gray-600 text-sm border">
                <tr className="border-b">
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">Prix</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-pink-100 text-pink-500 py-1 px-3 rounded-full text-xs">
                      {props.productDetails?.price} Frs
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium">Status</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        props.productDetails?.countInStock &&
                        props.productDetails?.countInStock > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {props.productDetails?.countInStock &&
                      props.productDetails?.countInStock > 0
                        ? "En stock"
                        : "Rupture de stock"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            {props.productDetails?.countInStock > 0 && (
              <div className="w-full my-3 space-y-2">
                <label htmlFor="qtyId" className="text-gray-600">
                  Quantité:
                </label>
                <CustomSelect />
              </div>
            )}
            <button
              onClick={handleAddToCart}
              className={`btn mt-4 w-full justify-center items-center space-x-2 ${
                props.productDetails?.countInStock === 0
                  ? "opacity-40 hover:opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={props.productDetails?.countInStock === 0}
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Ajouter au pannier</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-lg xl:text-2xl font-semibold text-gray-800 pb-2 border-b border-gray-300">
          {props?.productDetails?.reviews?.length! > 0
            ? props?.productDetails?.reviews?.length
            : null}{" "}
          Commentaires
        </h2>
        <div className="py-10">
          {props?.productDetails?.reviews?.length === 0 && (
            <NotFound>
              Aucun commentaires pour ce produit. Soyez le premier à commenter.
            </NotFound>
          )}
          {props?.userInfo ? (
            <div className="my-4">
              <ReviewForm productId={props?.match?.params?.id} />
            </div>
          ) : (
            <div className="my-4">
              <AlertBanner>
                Connectez-vous pour soumettre votre commentaire et vos
                appréciations du produit.
              </AlertBanner>
            </div>
          )}
          {props.productDetails?.reviews?.length! > 0 &&
            props.productDetails?.reviews?.reverse().map((review: IReview) => {
              return (
                <div
                  key={review._id}
                  className="mt-8 pt-6 border-t border-gray-200"
                >
                  <div className="flex flex-row items-center space-x-3">
                    <img
                      src={review?.user?.image}
                      alt={review?.user?.name}
                      className="rounded-full h-10 w-auto border border-pink-500"
                    />
                    <div className="">
                      <p className="text-gray-700 font-bold">
                        {review?.user?.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {moment(review?.createdAt).locale("fr").fromNow()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Rating value={review?.rating} />
                  </div>
                  <p className="text-gray-800 leading-8 tracking-wide">
                    {review?.comment}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isLoading: state.product.isLoading,
    error: state.product.error,
    productDetails: state.product.productDetails,
    userInfo: state.user.userInfo,
    successCreateReview: state.productCreateReview.success,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetProductDetails: (productId: string) => {
      return dispatch(actions.getProductDetails(productId));
    },
    onProductReviewReset: () => {
      return dispatch(actions.productCreateReviewReset());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
