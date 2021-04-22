import React from "react";
import { Link } from "react-router-dom";
import { IProductProps } from "../../types/types.models";
import Rating from "../Rating/Rating";

const Product = ({ productItem }: IProductProps) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 flex flex-col mb-8 group hover:scale-105 transition ease-in-out duration-200 transform">
      <Link
        to={`/product/${productItem?._id}`}
        className="bg-white rounded-lg shadow hover:shadow-md hover:translate-y-7 transition flex-1 flex flex-col overflow-hidden"
      >
        <div className="relative w-full rounded-md h-40">
          <div className="absolute inset-0 rounded-md overflow-hidden">
            <img
              src={productItem.image}
              alt={productItem.name}
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <p className="bg-pink-50 text-pink-500 rounded-lg px-2 py-1 mb-1 text-xs inline-block">
              {productItem?.category}
            </p>
          </div>
          <h3 className="text-gray-900 text-lg mb-3 leading-7">
            {productItem?.name}
          </h3>
          <Rating
            value={productItem.rating}
            text={`${productItem.numReviews} commentaires`}
          />
          <div>
            <p className="inline-flex items-center">
              <span className="text-gray-600 text-base mt-2 font-semibold">
                {productItem.price} Frs
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
