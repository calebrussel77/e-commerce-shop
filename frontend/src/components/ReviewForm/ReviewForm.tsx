import { useState } from "react";
import { connect } from "react-redux";

import CustomReviewSelect from "../UI/CustomReviewSelect/CustomReviewSelect";
import * as actions from "../../store/actions/index";
import { IState } from "../../types/types.models";

const ReviewForm = (props: {
  onCreateReview: (productId: string, review: any) => void;
  productId: string;
  isLoading: boolean;
  successCreateReview: boolean;
}) => {
  const [comment, setComment] = useState("");
  const [review, setReview] = useState(0);

  const reviewSelectHandler = (value) => {
    setReview(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    props.onCreateReview(props.productId, { comment, rating: review });
    if (props?.successCreateReview) {
      setComment("");
      setReview(0);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="w-full md:w-1/2 space-y-8">
        <CustomReviewSelect onchangeHandle={reviewSelectHandler} />
        <div>
          <label
            htmlFor="about"
            className="block text-gray-700 text-sm font-semibold tracking-wide uppercase"
          >
            Votre Commentaire
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              value={comment}
              required
              className="shadow-sm h-28 focus:ring-pink-500 focus:border-pink-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Appréciation du produit"
            ></textarea>
          </div>
        </div>
      </div>
      <button
        disabled={props.isLoading}
        className={`btn mt-4 rounded-md px-5 font-bold uppercase text-sm ${
          props.isLoading
            ? "opacity-50 hover:opacity-50 cursor-not-allowed"
            : ""
        }`}
        type="submit"
      >
        {props.isLoading ? (
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
            <span className="text-white">patientez...</span>
          </span>
        ) : (
          <span>Envoyer</span>
        )}
      </button>
    </form>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isLoading: state.productCreateReview.isLoading,
    userInfo: state.user.userInfo,
    successCreateReview: state.productCreateReview.success,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCreateReview: (productId: string, review: any) => {
      return dispatch(actions.createReview(productId, review));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
