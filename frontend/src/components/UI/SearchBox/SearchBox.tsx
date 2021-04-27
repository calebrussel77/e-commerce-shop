import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { IState, ProductType } from "../../../types/types.models";
import SearchModal from "../SearchModal/SearchModal";

const SearchBox = (props: {
  onSearchProductStart: () => void;
  onGetProductsList: () => void;
  products: ProductType[];
}) => {
  const handleSearchStart = () => {
    props.onGetProductsList();
    if (props.products.length > 0) {
      props.onSearchProductStart();
    }
  };

  return (
    <>
      <div
        onClick={handleSearchStart}
        className="cursor-pointer hover:bg-pink-100 p-2 rounded-full"
      >
        <svg
          className="w-7 h-7 text-pink-500"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <SearchModal />
    </>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isSearch: state.product.isSearch,
    products: state.product.products,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSearchProductStart: () => {
      return dispatch(actions.searchProductStart());
    },
    onGetProductsList: () => {
      return dispatch(actions.getProductsList());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
