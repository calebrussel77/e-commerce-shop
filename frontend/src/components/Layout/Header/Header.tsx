import { Transition, Menu } from "@headlessui/react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ICartItem, IState, IUser } from "../../../types/types.models";
import * as actions from "../../../store/actions/index";
import SearchBox from "../../UI/SearchBox/SearchBox";

const Header = (props: {
  cartItems: ICartItem[];
  userInfo: IUser;
  isAuthenticated: boolean;
  onloggedOutUser: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="relative py-3 bg-white shadow-md z-10">
        <nav className="relative max-w-screen-xl mx-auto flex items-center px-4 sm:px-6">
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center justify-between w-full ">
              <Link to="/" title="Page d'accueil" className="text-xl">
                <span className="text-pink-500 font-bold">E-</span>
                <span className="text-gray-900 leading-snug ml-1">Shop</span>
                <span className="text-pink-500 font-bold">.</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBox />
            <div className="-mr-2 flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                id="main-menu"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="hidden space-x-6 md:flex items-start">
              <NavLink
                to="/"
                activeClassName="text-pink-500"
                className="font-medium text-gray-500 hover:text-gray-800 transition duration-150 ease-in-out"
              >
                Home
              </NavLink>

              <NavLink
                to="https://twitter.com/CalebElat"
                className="font-medium text-gray-500 hover:text-gray-800 transition duration-150 ease-in-out"
              >
                Contact
              </NavLink>
            </div>
            <Link
              to="/cart"
              className="btn hidden md:flex hover:bg-pink-100 bg-pink-50 text-pink-500 relative"
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
            {props?.isAuthenticated || props?.userInfo != null ? (
              <div className="flex items-center justify-center">
                <div className="relative inline-block text-left">
                  <Menu>
                    {({ open }) => (
                      <>
                        <Menu.Button className="inline-flex items-center space-x-2 w-full text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:outline-none focus:border-pink-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                          <img
                            src={props?.userInfo?.image}
                            alt={props?.userInfo?.name}
                            className="rounded-full h-10 w-auto border-2 border-pink-500"
                          />
                          <svg
                            className="w-5 h-5 ml-2 -mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Menu.Button>

                        <Transition
                          show={open}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                          >
                            <div className="px-4 py-3 flex items-start space-x-2">
                              <div className="pt-2">
                                <img
                                  src={props?.userInfo?.image}
                                  alt={props?.userInfo?.name}
                                  className="rounded-full h-7 w-7 border-2 border-pink-500"
                                />
                              </div>
                              <div>
                                <p className="text-gray-900 text-sm leading-7">
                                  {props?.userInfo?.name}
                                </p>
                                <p className="text-xs font-medium leading-5 text-gray-400 truncate">
                                  {props?.userInfo?.email}
                                </p>
                              </div>
                            </div>

                            <div className="py-1">
                              {props?.isAuthenticated &&
                                props?.userInfo?.isAdmin && (
                                  <>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to="/admin/users"
                                          className={`${
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700"
                                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                        >
                                          Gestion des Utilisateurs
                                        </Link>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to="/admin/orders"
                                          className={`${
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700"
                                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                        >
                                          Gestion des Commandes
                                        </Link>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <Link
                                          to="/admin/products"
                                          className={`${
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700"
                                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                        >
                                          Gestion des Produits
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  </>
                                )}
                              {props?.isAuthenticated && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/profile"
                                      className={`${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                    >
                                      Compte utilisateur
                                    </Link>
                                  )}
                                </Menu.Item>
                              )}
                              <Menu.Item
                                as="span"
                                disabled
                                className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                              >
                                Paramètre (soon)
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#license"
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700"
                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                  >
                                    Mentions j'aime
                                  </a>
                                )}
                              </Menu.Item>
                            </div>

                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    onClick={props.onloggedOutUser}
                                    className={`${
                                      active
                                        ? "bg-red-100 text-red-600"
                                        : "text-red-500"
                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer`}
                                  >
                                    Déconnexion
                                  </span>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn hidden md:flex">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>Se connecter</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
