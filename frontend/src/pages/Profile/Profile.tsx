import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/fr";

import * as actions from "../../store/actions/index";
import { IOrder, IState, IUser } from "../../types/types.models";
import { useEffect, useState } from "react";
import NotFound from "../../components/NotFound/NotFound";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";

const Profile = (props: {
  onGetUserProfile: (id: string) => void;
  onUpdateUserProfil: (userUpdateInfo: Partial<IUser>) => void;
  onAddNotif: (type: string, msg: string) => void;
  isLoading: boolean;
  isLoadingUserOrders: boolean;
  userDetails: IUser;
  onGetuserOrders: () => void;
  onUserOrdersReset: () => void;
  onResetUserProfile: () => void;
  userOrders: IOrder[] | [];
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const {
    userDetails,
    onUpdateUserProfil,
    onGetuserOrders,
    onGetUserProfile,
    onAddNotif,
    isLoadingUserOrders,
    isLoading,
    userOrders,
    onResetUserProfile,
    onUserOrdersReset,
  } = props;

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangeZipCode = (e: any) => {
    setZipCode(e.target.value);
  };
  const handleChangeWebsite = (e: any) => {
    setWebsite(e.target.value);
  };
  const handleChangeCity = (e: any) => {
    setCity(e.target.value);
  };
  const handleChangeState = (e: any) => {
    setState(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };
  const handleChangePassword2 = (e: any) => {
    setPassword2(e.target.value);
  };

  useEffect(() => {
    if (!userDetails) {
      // onResetUserProfile();
      // onUserOrdersReset();
      onGetUserProfile("profile");
      onGetuserOrders();
    } else {
      setName(String(userDetails.name));
      setImage(String(userDetails.image));
      setEmail(String(userDetails.email));
      setWebsite(String(userDetails.website));
      setCity(String(userDetails.city));
      setState(String(userDetails.state));
      setZipCode(String(userDetails.zipCode));
    }
  }, [
    onResetUserProfile,
    onGetUserProfile,
    onGetuserOrders,
    userDetails,
    onUserOrdersReset,
  ]);

  const handleSubmitUserProfil = (e: any) => {
    e.preventDefault();
    if (password && password !== password2) {
      onAddNotif("INFO", "Les mots de passe ne correspondent pas.");
    } else {
      //Dispatch update profil info
      onUpdateUserProfil({
        name,
        website,
        image,
        email,
        city,
        state,
        zipCode,
      });
    }
  };

  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Mes Commandes
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Consultez la liste de vos commandes passées sur notre
                plateforme.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {isLoadingUserOrders && <Spinner />}

                <div className="w-full overflow-hidden rounded-lg shadow-xs">
                  <div className="w-full overflow-x-auto">
                    {userOrders && userOrders.length > 0 && (
                      <table className="w-full whitespace-no-wrap">
                        <thead>
                          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th className="px-4 py-3">ID Commande</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Payé</th>
                            <th className="px-4 py-3">Livré</th>
                            <th className="px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                          {userOrders.map((userOrder: IOrder, i: number) => {
                            return (
                              <tr
                                key={i}
                                className="text-gray-700 dark:text-gray-400"
                              >
                                <td className="px-4 py-3">
                                  <div className="flex items-center">
                                    <p className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 text-center">
                                      {userOrder?.paymentResult?.id
                                        ? userOrder?.paymentResult?.id
                                        : "Non défini"}
                                    </p>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-sm">
                                  {moment(userOrder.createdAt)
                                    .locale("fr")
                                    .format("ll")}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 font-semibold">
                                  {userOrder.totalPrice.toFixed(2)} frs
                                </td>
                                <td className="px-4 py-3">
                                  <span
                                    className={`whitespace-nowrap text-xs px-2 py-1 font-semibold leading-tight rounded-full dark:bg-green-700 dark:text-green-100 ${
                                      !userOrder.isPaid
                                        ? "text-red-500 bg-red-100 "
                                        : "text-green-500 bg-green-100  "
                                    } `}
                                  >
                                    {!userOrder.isPaid
                                      ? "Non Payé"
                                      : moment(userOrder.paidAt)
                                          .locale("fr")
                                          .format("ll")}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <span
                                    className={`whitespace-nowrap text-xs px-2 py-1 font-semibold leading-tight rounded-full dark:bg-green-700 dark:text-green-100 ${
                                      !userOrder.isDelivered
                                        ? "text-red-500 bg-red-100 "
                                        : "text-green-500 bg-green-100  "
                                    } `}
                                  >
                                    {!userOrder.isDelivered
                                      ? "Non Livré"
                                      : moment(userOrder.deliveredAt)
                                          .locale("fr")
                                          .format("ll")}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center space-x-4 ">
                                    <Link
                                      to={`order/${userOrder?._id}`}
                                      className="btn relative text-xs"
                                    >
                                      <span className="whitespace-nowrap">
                                        Voir les détails
                                      </span>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}

                    {!isLoadingUserOrders && userOrders.length === 0 && (
                      <NotFound>
                        Aucune commande n'a encore été effectuée.
                      </NotFound>
                    )}
                  </div>
                </div>
                {/*End Tables */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profil
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Ces informations seront affichées publiquement, alors faites
                attention à ce que vous partagez.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmitUserProfil}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company_website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Site web
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          name="website"
                          id="company_website"
                          onChange={handleChangeWebsite}
                          value={website}
                          className="focus:ring-pink-500 focus:border-pink-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      {/* <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span> */}
                      <img
                        src={image}
                        alt="salut"
                        className="inline-block h-12 w-12 rounded-full overflow-hidden"
                      />
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        Changez
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500  ${
                      isLoading
                        ? "opacity-50 hover:opacity-50 cursor-not-allowed"
                        : "hover:bg-pink-600 "
                    }`}
                  >
                    {isLoading ? (
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
                        <span>patientez...</span>
                      </span>
                    ) : (
                      <span>Mettre à Jour</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Informations personnelles
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Utilisez une adresse permanente où vous pouvez recevoir vos
                courriers.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmitUserProfil}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom d'utilisateur
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChangeName}
                        value={name}
                        autoComplete="name"
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Addresse email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email_address"
                        value={email}
                        onChange={handleChangeEmail}
                        autoComplete="email"
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        minLength={6}
                        title="Votre mot de passe doit contenir au moins 06 caractères."
                        onChange={handleChangePassword}
                        value={password}
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="password2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirmation du mot de passe
                      </label>
                      <input
                        type="password"
                        name="password2"
                        id="password2"
                        title="Votre mot de passe doit contenir au moins 06 caractères."
                        minLength={6}
                        onChange={handleChangePassword2}
                        value={password2}
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Quartier
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={city}
                        onChange={handleChangeCity}
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Etat / Region
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        value={state}
                        onChange={handleChangeState}
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal_code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Code Postal
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        id="postal_code"
                        value={zipCode}
                        onChange={handleChangeZipCode}
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500  ${
                      isLoading
                        ? "opacity-50 hover:opacity-50 cursor-not-allowed"
                        : "hover:bg-pink-600 "
                    }`}
                  >
                    {isLoading ? (
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
                        <span>patientez...</span>
                      </span>
                    ) : (
                      <span>Mettre à Jour</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isLoading: state.user.isLoading,
    isLoadingUserOrders: state.userOrders.isLoading,
    userOrders: state.userOrders.userOrders,
    userDetails: state.user.userDetails,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetUserProfile: (id: string) => dispatch(actions.getUserdetails(id)),
    onGetuserOrders: () => dispatch(actions.getuserOrders()),
    onResetUserProfile: () => dispatch(actions.resetUserProfile()),
    onUserOrdersReset: () => dispatch(actions.userOrdersReset()),
    onUpdateUserProfil: (userUpdateInfo: Partial<IUser>) =>
      dispatch(actions.UpdateUserProfil(userUpdateInfo)),
    onAddNotif: (type: string, msg: string) =>
      dispatch(actions.displayNotif(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
