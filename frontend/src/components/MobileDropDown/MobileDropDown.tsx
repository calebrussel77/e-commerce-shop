import { Popover, Transition } from "@headlessui/react";
import {
  XIcon,
  HomeIcon,
  MenuIcon,
  CogIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/outline";
import { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../store/actions/index";
import { ICartItem, IState, IUser } from "../../types/types.models";

const MobileDropDown = (props: {
  isAuthenticated: boolean;
  userInfo: IUser;
  cartItems: ICartItem[];
  onloggedOutUser: () => void;
}) => {
  return (
    <div className="-mr-2 flex items-center md:hidden">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                 group p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out`}
            >
              <MenuIcon className="w-6 h-6" />
            </Popover.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                 group absolute p-2 right-2 top-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out`}
                  >
                    <XIcon className="h-6 w-6" />
                  </Popover.Button>
                  <div className="grid gap-8 p-7 sm:grid-cols-2 mt-8">
                    {props.isAuthenticated && props.userInfo?.isAdmin && (
                      <>
                        <Link
                          to="/"
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center p-2 bg-pink-50 rounded-md">
                            <HomeIcon className="w-6 h-6 text-pink-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-900">Accueil</p>
                            <p className="text-sm text-gray-500">
                              Consultez nos derniers produits via notre home
                              page.
                            </p>
                          </div>
                        </Link>
                        <Link
                          to="/admin/users"
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center p-2 bg-pink-50 rounded-md">
                            <UserGroupIcon className="w-6 h-6 text-pink-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-900">
                              Gestion des utilisateurs
                            </p>
                            <p className="text-sm text-gray-500">
                              Gérer vos utilisateurs selon la vision de la
                              plateforme.
                            </p>
                          </div>
                        </Link>
                        <Link
                          to="/admin/products"
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center p-2 bg-pink-50 rounded-md">
                            <ShoppingBagIcon className="w-6 h-6 text-pink-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-900">
                              Gestion des Produits
                            </p>
                            <p className="text-sm text-gray-500">
                              Organisez les produits disponibles sur la
                              plateforme en fonction de vos requirements.
                            </p>
                          </div>
                        </Link>
                        <Link
                          to="/admin/orders"
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center p-2 bg-pink-50 rounded-md">
                            <TruckIcon className="w-6 h-6 text-pink-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-900">
                              Gestion des Commandes
                            </p>
                            <p className="text-sm text-gray-500">
                              Gérez les commandes utilisateurs passées sur la
                              plateforme.
                            </p>
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="p-4 bg-gray-50">
                    {!props?.isAuthenticated && (
                      <Link
                        to="/login"
                        className="btn p-2 w-full flex justify-center items-center"
                      >
                        Se connecter
                      </Link>
                    )}

                    {props.isAuthenticated && (
                      <div>
                        <div className="px-4 py-3 flex items-start space-x-3">
                          <div className="pt-2">
                            <img
                              src={props?.userInfo?.image}
                              alt={props?.userInfo?.name}
                              className="rounded-full h-10 w-10 border-2 border-green-600"
                            />
                          </div>
                          <div>
                            <p className="text-gray-900 text-sm leading-7 font-semibold">
                              {props?.userInfo?.name}
                            </p>
                            <p className="text-xs font-medium leading-5 text-gray-400 truncate">
                              {props?.userInfo?.email}
                            </p>
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          className="mb-3 mt-1 flex items-center px-4 py-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex items-center justify-center p-2 bg-gray-100 rounded-md">
                            <CogIcon className="w-6 h-6 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-900">
                              Compte Utilisateur
                            </p>
                            <p className="text-sm text-gray-500 max-w-md ">
                              Modifiez vos infos infos personnelles, et
                              consultez l'historique de vos commandes.
                            </p>
                          </div>
                        </Link>
                      </div>
                    )}
                    <Link
                      to="/cart"
                      className="btn flex flex-row hover:bg-pink-200 bg-pink-100 text-pink-500 relative my-2 justify-center items-center"
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>Pannier</span>
                      {props?.cartItems && props?.cartItems?.length > 0 ? (
                        <>
                          <div className="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-pink-500 animate-ping" />
                          <div className="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-pink-500" />
                        </>
                      ) : null}
                    </Link>
                    {props.isAuthenticated && (
                      <span
                        onClick={props.onloggedOutUser}
                        className="btn p-2 w-full flex justify-center items-center cursor-pointer bg-red-500 hover:bg-red-600"
                      >
                        Se déconnecter
                      </span>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    cartItems: state.cart.cartItems,
    userInfo: state.user.userInfo,
    isAuthenticated: state.user.token ? true : false,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onloggedOutUser: () => dispatch(actions.loggedOutUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MobileDropDown);
