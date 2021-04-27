import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import { IState, IUser } from "../../types/types.models";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";

const UserEdit = (props: {
  onGetUserEditData: (id: string) => void;
  onUpdateUserData: (id: string, userInfo: IUser) => void;
  userEdit: Partial<IUser | null>;
  isLoadingUpdate: boolean;
  isLoadingEdit: boolean;
  match: any;
  history: any;
  updateSuccess: boolean;
}) => {
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");

  const {
    userEdit,
    isLoadingEdit,
    isLoadingUpdate,
    onGetUserEditData,
    onUpdateUserData,
    history,
    match,
    updateSuccess,
  } = props;

  const id = match?.params?.id;

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangeIsAdmin = () => {
    setIsAdmin(!isAdmin);
  };
  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  useEffect(() => {
    // if (updateSuccess) {
    //   // history.goBack();
    // } else {
    if (!userEdit?.name || userEdit?._id !== id) {
      onGetUserEditData(id);
    } else {
      setName(String(userEdit?.name));
      setEmail(String(userEdit?.email));
      setIsAdmin(Boolean(userEdit?.isAdmin));
    }
    // }
  }, [userEdit, id, onGetUserEditData, history, updateSuccess]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onUpdateUserData(id, { name, email, isAdmin });
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
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Informations de l'utilisateur
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Modifier de manière conforme les informations de l'utilisateur.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
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
                    <div className="col-span-6 sm:col-span-4">
                      <div className="flex items-center space-x-2">
                        <input
                          id="isAdmin"
                          name="isAdmin"
                          type="checkbox"
                          checked={isAdmin}
                          onChange={handleChangeIsAdmin}
                          className="cursor-pointer h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="isAdmin"
                          className="ml-2 block text-sm text-gray-900 cursor-pointer"
                        >
                          Assigné en tant que Administrateur
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    disabled={isLoadingUpdate}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500  ${
                      isLoadingUpdate
                        ? "opacity-50 hover:opacity-50 cursor-not-allowed"
                        : "hover:bg-pink-600 "
                    }`}
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
    isLoadingEdit: state.userEdit.isLoading,
    isLoadingUpdate: state.userUpdate.isLoading,
    updateSuccess: state.userUpdate.success,
    userEdit: state.userEdit.userEdit,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGetUserEditData: (id: string) => dispatch(actions.getUserEditData(id)),
    onUpdateUserData: (id: string, userInfo: IUser) =>
      dispatch(actions.updateUserData(id, userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
