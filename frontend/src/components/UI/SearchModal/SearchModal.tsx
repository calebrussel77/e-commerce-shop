import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import { IState, ProductType } from "../../../types/types.models";

const SearchModal = (props: {
  onResetProductSearch: () => void;
  onSearchProduct: (productSearch: string) => void;
  isSearch: boolean;
  isLoading: boolean;
  productsSearch: ProductType[];
}) => {
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    if (searchWord !== "") {
      props.onSearchProduct(searchWord);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord, props.onSearchProduct]);

  const handleSearchClose = () => {
    setSearchWord("");
    props.onResetProductSearch();
  };

  return (
    <Transition show={props.isSearch} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className="fixed inset-0 z-10 overflow-y-auto"
        static
        open={props.isSearch}
        onClose={handleSearchClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Rechercher un produit
              </Dialog.Title>
              <div className="w-full mt-2">
                <div className="w-full flex justify-center">
                  <form className="w-full">
                    <div className="relative w-full max-w-xl mr-6 focus-within:text-brand-500">
                      <div className="absolute inset-y-0 flex items-center pl-2">
                        <svg
                          className="w-5 h-5 text-pink-500"
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
                      <input
                        className="w-full pl-9 py-3 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md focus:ring-2 focus:ring-pink-500 form-input"
                        type="text"
                        name="searchWord"
                        autoFocus
                        onChange={(e) => setSearchWord(e.target.value)}
                        value={searchWord}
                        placeholder="Rechercher un produit..."
                        aria-label="Search"
                        autoComplete="false"
                      />
                    </div>
                  </form>
                </div>
              </div>

              <div className="mt-4">
                {props.productsSearch?.length > 0 &&
                  props.productsSearch?.map((product: ProductType) => {
                    return (
                      <div
                        key={product._id}
                        className="group border-t border-gray-300 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                      >
                        <Link to={`/product/${product?._id}`}>
                          <div
                            onClick={handleSearchClose}
                            className="flex flex-row items-center space-x-3 py-6"
                          >
                            <div className="h-14 w-14 overflow-hidden">
                              <img
                                src={product?.image}
                                alt={product?.name}
                                className="rounded h-full w-full"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700 font-bold group-hover:underline">
                                {product?.name}
                              </p>
                              <p className="text-gray-500 text-sm line-clamp-3">
                                {product?.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isSearch: state.product.isSearch,
    isLoading: state.product.isLoading,
    productsSearch: state.product.productsSearch,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onResetProductSearch: () => {
      return dispatch(actions.resetProductSearch());
    },
    onSearchProduct: (product: string) => {
      return dispatch(actions.searchProduct(product));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
