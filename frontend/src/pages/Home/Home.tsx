import { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../../components/Product/Product";
import { connect } from "react-redux";

import { ProductType, IState } from "../../types/types.models";
import * as actions from "../../store/actions/index";
import NotFound from "../../components/NotFound/NotFound";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import TopProductsCarroussel from "../../components/UI/TopProductsCarroussel/TopProductsCarroussel";
import SeoMetaTags from "../../components/SeoMetaTags/SeoMetaTags";

const Home = (props: any) => {
  useEffect(() => {
    props.onGetProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate__animated animate__fadeIn">
      <SeoMetaTags />
      <div className="w-full mb-10">
        <TopProductsCarroussel />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-baseline justify-between border-b border-gray-200 mb-10">
          <h2 className="text-base inline-flex items-center space-x-3 font-bold leading-8 tracking-tight text-gray-600 sm:text-xl sm:leading-10 py-4 border-b-2 border-pink-500 -mb-2px">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>Derniers produits</span>
          </h2>
          <Link
            to="/products"
            className="font-semibold text-pink-500 hover:underline no-underline"
          >
            Voir tous
          </Link>
        </div>

        <div className="mt-3">
          {props.isLoading ? (
            <Spinner />
          ) : props.error ? (
            <Error>Une erreur est survenue veuillez recharger la page.</Error>
          ) : props.products && props.products?.length > 0 ? (
            <div className="flex flex-wrap -mx-3">
              {props.products?.map((product: ProductType) => {
                return <Product key={product?._id} productItem={product} />;
              })}
            </div>
          ) : (
            <NotFound>Aucun produit n'a encore été ajouté.</NotFound>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: IState) => {
  return {
    products: state.product.products,
    isLoading: state.product.isLoading,
    error: state.product.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetProductList: () => dispatch(actions.getProductsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
