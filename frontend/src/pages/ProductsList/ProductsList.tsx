import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import * as actions from "../../store/actions/index";
import { ProductType, IState } from "../../types/types.models";
import Spinner from "../../components/Spinner/Spinner";

const UsersList = (props: {
  onGetProductsList: () => void;
  onCreateProduct: () => void;
  onResetProduct: () => void;
  onDeleteProduct: (productId: string) => void;
  isLoading: boolean;
  history: any;
  createdProduct: Partial<ProductType | null>;
  products: ProductType[];
  successDelete: boolean;
  isLoadingCreateProd: boolean;
  successCreate: boolean;
}) => {
  const {
    onGetProductsList,
    onDeleteProduct,
    isLoading,
    successDelete,
    products,
    history,
    isLoadingCreateProd,
    createdProduct,
    onCreateProduct,
    successCreate,
    onResetProduct,
  } = props;

  const handleDelete = (productId: string) => {
    const answer = window.confirm(`Vous voulez vraiment supprimé ce produit ?`);

    if (answer) {
      onDeleteProduct(productId);
    }
  };

  useEffect(() => {
    onResetProduct();
    if (successCreate) {
      history.push(`/admin/product/${createdProduct?._id}/edit`);
    } else {
      onGetProductsList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onGetProductsList, successDelete, history, successCreate]);

  const createProduct = () => {
    onCreateProduct();
  };

  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-row justify-between items-center">
        <h4 className="mb-4 text-lg font-semibold tracking-wide text-gray-900 uppercase">
          Liste des Produits
        </h4>
        <button
          disabled={isLoadingCreateProd}
          className={`group btn ${
            isLoadingCreateProd
              ? "opacity-50 hover:opacity-50 cursor-not-allowed"
              : "hover:bg-pink-700 "
          }`}
          onClick={createProduct}
        >
          Ajouter un Produit
        </button>
      </div>

      {isLoading && <Spinner />}

      <div className="w-full overflow-hidden rounded-lg shadow-xs mt-6">
        {products && products?.length > 0 && (
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Produit</th>
                  <th className="px-4 py-3">Prix</th>
                  <th className="px-4 py-3">Catégorie</th>
                  <th className="px-4 py-3">Marque</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {products?.map((product) => {
                  return (
                    <tr
                      key={product?._id}
                      className="text-gray-700 dark:text-gray-400"
                    >
                      <td className="pl-2 pr-4 py-4 text-sm">
                        <p className="text-sm text-gray-800 dark:text-gray-400 text-center">
                          {product?._id}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center text-sm">
                          <div className="relative hidden w-8 h-8 mr-3 rounded-md md:block">
                            <img
                              className="object-cover w-full h-full rounded-md"
                              src={product?.image}
                              alt={product?.name}
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <Link
                              to={`/product/${product._id}`}
                              className="font-semibold hover:underline"
                            >
                              {product?.name}
                            </Link>
                            <p className="text-xs text-gray-500 dark:text-gray-400 w-56 truncate mt-1">
                              {product?.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {product?.price} frs
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {product?.category}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {product?.brand}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-4 text-sm">
                          <Link
                            to={`/admin/product/${product._id}/edit`}
                            className="group relative hover:bg-green-100 flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-green-600 rounded-full transition ease-in-out duration-200 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Delete"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            <p className="bg-red-100 invisible absolute top-0 -mt-7 right-0 -mr-6 group-hover:visible text-xs p-1 rounded-md">
                              Editer
                            </p>
                          </Link>
                          <button
                            onClick={() => handleDelete(String(product._id))}
                            className="group relative hover:bg-red-100 flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-full transition ease-in-out duration-200 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Delete"
                          >
                            <svg
                              className="w-6 h-6"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                strokeWidth={1}
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <p className="bg-red-100 invisible absolute top-0 -mt-7 right-0 -mr-6 group-hover:visible text-xs p-1 rounded-md">
                              Supprimer
                            </p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="grid px-4 py-4 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
          <span className="flex items-center col-span-3">
            {`Montrant ${isLoading ? "chargement..." : products?.length} sur ${
              isLoading ? "loading..." : products?.length
            }`}
          </span>
          <span className="col-span-2"></span>
          <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end"></span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isLoading: state.product.isLoading,
    isLoadingCreateProd: state.productCreate.isLoading,
    products: state.product.products,
    successDelete: state.product.successDelete,
    successCreate: state.productCreate.success,
    createdProduct: state.productCreate.product,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetProductsList: () => dispatch(actions.getProductsList()),
    onResetProduct: () => dispatch(actions.resetProduct()),
    onCreateProduct: () => dispatch(actions.createProduct()),
    onDeleteProduct: (productId: string) =>
      dispatch(actions.deleteProductById(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
