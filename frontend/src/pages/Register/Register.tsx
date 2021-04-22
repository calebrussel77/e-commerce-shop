import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { IState, IUser } from "../../types/types.models";
import Logo from "../../assets/images/Logo.png";
import ImgAuth from "../../assets/svgs/svgLogin.svg";
import { useState } from "react";

const Register = (props: {
  onRegisterUser: (name: string, email: string, password: string) => void;
  onAddNotif: (type: string, msg: string) => void;
  location: any;
  isLoading: boolean;
  history: any;
  token: string;
  userInfo: IUser;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password !== password2) {
      props.onAddNotif("INFO", "Les mots de passe ne correspondent pas.");
    } else {
      props.onRegisterUser(name, email, password);
      setPassword("");
      setPassword2("");
    }
  };

  return (
    <div className="animate__animated animate__fadeIn min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 relative bg-pink-100 bg-opacity-10">
      <img
        className="hidden sm:inline-block absolute left-36 top-10 w-1/3 mt-36 transform translate-x-10 opacity-10"
        src={ImgAuth}
        alt="Workflow"
      />
      <div className="relative max-w-md w-full space-y-8 z-10">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-wide">
            Créer son compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Et{" "}
            <span className="font-medium text-pink-500">
              Profitez de nos produits à 15% de réduction.
            </span>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div>
            <div className="py-3">
              <div className="col-span-3">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Nom d'utilisateur
                </label>
                <div className="mt-2">
                  <input
                    className="w-full border-gray-300 shadow-sm rounded-lg focus:border-pink-500 focus:ring-pink-500"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    onChange={handleChangeName}
                    value={name}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="mt-4 col-span-3">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Adresse e-mail
                </label>
                <div className="mt-2">
                  <input
                    className="w-full border-gray-300 shadow-sm rounded-lg focus:border-pink-500 focus:ring-pink-500"
                    name="email"
                    type="email"
                    required
                    placeholder="johndoe@example.com"
                    onChange={handleChangeEmail}
                    value={email}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="mt-4 col-span-3">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-2">
                  <input
                    className="w-full border-gray-300 shadow-sm rounded-lg focus:border-pink-500 focus:ring-pink-500"
                    name="password"
                    type="password"
                    required
                    placeholder="Votre Mot de passe"
                    onChange={handleChangePassword}
                    value={password}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="mt-4 col-span-3">
                <label className="block text-sm font-medium leading-5 text-gray-700">
                  Confirmation du mot de passe
                </label>
                <div className="mt-2">
                  <input
                    className="w-full border-gray-300 shadow-sm rounded-lg focus:border-pink-500 focus:ring-pink-500"
                    name="password2"
                    type="password"
                    required
                    placeholder="Confirmez votre mot de passe"
                    onChange={handleChangePassword2}
                    value={password2}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                se souvenir de moi
              </label>
            </div>

            <div className="text-sm">
              <span className="">
                Vous avez un compte ?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : `/login`}
                  className="text-pink-500 hover:underline cursor-pointer"
                >
                  connectez-vous
                </Link>
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={props.isLoading}
              className={`group relative w-full shadow flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                props.isLoading
                  ? "opacity-50 hover:opacity-50 cursor-not-allowed"
                  : "hover:bg-pink-600 "
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-pink-300 group-hover:text-pink-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {props.isLoading ? (
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
                <span>Connexion</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    isLoading: state.user.isLoading,
    userInfo: state.user.userInfo,
    error: state.user.error,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onRegisterUser: (name: string, email: string, password: string) =>
      dispatch(actions.registerUser(name, email, password)),
    onAddNotif: (type: string, msg: string) =>
      dispatch(actions.displayNotif(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
