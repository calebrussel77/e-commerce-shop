import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import { IState, ProductType } from "../../types/types.models";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
import { store } from "../..";

const ProductEdit = (props: {
  onGetProductEditData: (id: string) => void;
  onResetUpdatedProduct: () => void;
  onUpdateProductData: (id: string, productInfo: any) => void;
  productEdit: Partial<ProductType | null>;
  isLoadingUpdate: boolean;
  isLoadingEdit: boolean;
  match: any;
  history: any;
  updateSuccess: boolean;
}) => {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  });

  const {
    productEdit,
    isLoadingEdit,
    isLoadingUpdate,
    onGetProductEditData,
    onUpdateProductData,
    onResetUpdatedProduct,
    history,
    match,
    updateSuccess,
  } = props;

  const [fileInput, setFileInput] = useState("");
  const [fileServer, setFileServer] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleImputChange = async (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setFileServer(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(String(reader?.result));
    };
  };

  const handleImage = async () => {
    const formData = new FormData();
    formData.append("image", fileServer);

    try {
      const { data } = await axios.post(`/api/uploads`, formData, {
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${store?.getState()?.user?.token}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const productId = match?.params?.id;

  const handleChange = (e: any) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      onResetUpdatedProduct();
      history.goBack();
    } else {
      if (!productEdit?.name || productEdit?._id !== productId) {
        onGetProductEditData(productId);
      } else {
        setProductData({
          name: String(productEdit.name),
          image: String(productEdit.image),
          price: Number(productEdit.price),
          brand: String(productEdit.brand),
          category: String(productEdit.category),
          countInStock: Number(productEdit.countInStock),
          description: String(productEdit.description),
        });
      }
    }
  }, [
    productEdit,
    productId,
    onGetProductEditData,
    updateSuccess,
    history,
    onResetUpdatedProduct,
  ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!fileServer) {
        onUpdateProductData(productId, productData);
      } else {
        const responseImage = await handleImage();
        if (responseImage) {
          onUpdateProductData(productId, {
            ...productData,
            image: `${process.env.REACT_APP_BASE_URL}${responseImage}`,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      {isLoadingEdit && <Spinner />}

      <span
        onClick={() => history.goBack()}
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
      <div className="h-full flex flex-col space-y-6 py-6 pb-16">
        <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
          <div className="py-8 border-t border-gray-200 w-full">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Mettre à jour un Produit
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Remplissez les informations du produit de tel sorte que les
                    utilisateurs de la plateforme puissent clairement
                    l'identifier.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="shadow rounded-md overflow-hidden">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div>
                        <label className="block text-sm leading-5 font-medium text-gray-700">
                          Image de L'article
                        </label>
                        <div className="mt-2 flex items-center flex-col-reverse md:flex-row">
                          <span className="inline-block h-64 w-64 rounded-md overflow-hidden bg-gray-100 mt-3 md:mt-0 border border-gray-200">
                            {productData?.image || previewSource ? (
                              <img
                                src={
                                  previewSource
                                    ? previewSource
                                    : productData?.image
                                }
                                alt={productData?.name || "produit de vente"}
                                className="h-full w-full rounded-md object-cover object-center"
                              />
                            ) : (
                              <div className="text-sm text-gray-600 leading-5">
                                Aucune image sélectionnée
                              </div>
                            )}
                          </span>
                          <div tabIndex={0}>
                            <input
                              type="file"
                              id="defaultBtn"
                              name="postImage"
                              accept="image/png, image/jpeg, image/jpg, image/JPEG, image/JPG, image/PNG"
                              value={fileInput}
                              onChange={handleImputChange}
                              className="hidden"
                            />
                            <button
                              id="customBtn"
                              onClick={() => {
                                const input: any = document.querySelector(
                                  "#defaultBtn"
                                );
                                input.click();
                              }}
                              type="button"
                              className="ml-5 shadow-sm py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:border-pink-200 focus:shadow-outline-pink active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                            >
                              Ajouter l'image de fond
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 mt-6">
                        <div className="col-span-3">
                          <label className="block text-sm leading-5 font-medium text-gray-700">
                            Nom du Produit
                          </label>
                          <div className="mt-2 rounded-md shadow-sm">
                            <input
                              className="form-input border border-gray-300 flex-1 block w-full focus:shadow-outline-pink focus:border-pink-200 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              name="name"
                              type="text"
                              onChange={handleChange}
                              value={productData?.name}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="mt-4 col-span-3">
                          <label className="block text-sm font-medium leading-5 text-gray-700">
                            Description du produit
                          </label>
                          <div className="mt-2 flex w-full rounded-md shadow-sm relative">
                            <textarea
                              rows={3}
                              className="form-textarea border border-gray-300 flex-1 block w-full focus:shadow-outline-pink focus:border-pink-200 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                              autoComplete="off"
                              onChange={handleChange}
                              value={productData?.description}
                              name="description"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm leading-5 font-medium text-gray-700">
                          Prix du produit
                        </label>
                        <div className="mt-2 rounded-md shadow-sm">
                          <input
                            className="form-input border border-gray-300 flex-1 block w-full focus:shadow-outline-pink focus:border-pink-200 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            name="price"
                            type="number"
                            onChange={handleChange}
                            value={productData?.price}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm leading-5 font-medium text-gray-700">
                          Nombre en Stock
                        </label>
                        <div className="mt-2 rounded-md shadow-sm">
                          <input
                            className="form-input border border-gray-300 flex-1 block w-full focus:shadow-outline-pink focus:border-pink-200 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            name="countInStock"
                            type="number"
                            onChange={handleChange}
                            value={productData?.countInStock}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm leading-5 font-medium text-gray-700">
                          Marque
                        </label>
                        <div className="mt-2 rounded-md shadow-sm">
                          <input
                            className="form-input border border-gray-300 flex-1 block w-full focus:shadow-outline-pink focus:border-pink-200 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            name="brand"
                            type="text"
                            onChange={handleChange}
                            value={productData?.brand}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm leading-5 font-medium text-gray-700">
                          Catégorie
                        </label>
                        <div className="mt-2 rounded-md shadow-sm">
                          <input
                            className="form-input border border-gray-300 flex-1 block w-full focus:shadow-outline-pink focus:border-pink-200 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            name="category"
                            type="text"
                            onChange={handleChange}
                            value={productData?.category}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <span className="inline-flex rounded-md shadow-sm">
                        <button
                          disabled={isLoadingUpdate}
                          className={`px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-pink-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-pink-700 focus:outline-none focus:shadow-outline-purpleitems-center justify-center text-sm ${
                            isLoadingUpdate
                              ? "opacity-50 hover:opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          type="submit"
                        >
                          {isLoadingUpdate ? (
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
                            <span>Mettre à jour</span>
                          )}
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isLoadingUpdate: state.productUpdate.isLoading,
    updateSuccess: state.productUpdate.success,
    isLoadingEdit: state.product.isLoading,
    productEdit: state.product.productDetails,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetProductEditData: (id: string) =>
      dispatch(actions.getProductDetails(id)),
    onUpdateProductData: (id: string, productInfo: ProductType) =>
      dispatch(actions.updateProductData(id, productInfo)),
    onResetUpdatedProduct: () => dispatch(actions.resetUpdatedProduct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
