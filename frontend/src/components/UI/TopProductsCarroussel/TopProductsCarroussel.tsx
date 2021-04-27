import React, { useEffect } from "react";
import { connect } from "react-redux";
import Carousel from "react-elastic-carousel";
import { IState, ProductType } from "../../../types/types.models";
import * as actions from "../../../store/actions/index";
import { Link } from "react-router-dom";

const TopProductsCarroussel = (props: {
  topProducts: ProductType[];
  isLoading: boolean;
  onGetTopRatedProducts: () => void;
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 4,
    isRTL: false,
    showArrows: false,
  };

  useEffect(() => {
    props.onGetTopRatedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onGetTopRatedProducts]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 pb-10">
      <div className="mx-auto w-full">
        <Carousel {...settings}>
          {props.topProducts.map((product, idx) => (
            <div
              key={idx}
              className="px-3 md:px-0 shadow-lg rounded-lg overflow-hidden relative items-center justify-center py-20 sm:py-28 w-full"
              style={{ height: "420px" }}
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product?.image.length > 0 ? product?.image[0] : ""}
                  alt={product.name}
                  className="absolute inset-0 object-center object-cover w-full h-full"
                />
                <div className="mx-auto max-w-sm sm:max-w-xl text-center relative z-10">
                  <h2 className="group-hover:underline line-clamp-3 text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
                    {product?.name}
                  </h2>
                  <p className="mt-3 text-gray-300 line-clamp-2 tracking-wide leading-6">
                    {product?.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-black opacity-50" />
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    topProducts: state.productRatingTop.topProducts,
    isLoading: state.productRatingTop.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetTopRatedProducts: () => dispatch(actions.getTopRatedProducts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopProductsCarroussel);
