import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { useState } from "react";
import { IShippingAddress, IState } from "../../types/types.models";
import CheckoutStep from "../../components/CheckoutStep/CheckoutStep";

const Shipping = (props: {
  history: any;
  shippingAddress: IShippingAddress;
  onSaveShippingAddress: (data: IShippingAddress) => void;
}) => {
  const { shippingAddress, history, onSaveShippingAddress } = props;

  const [address, setAdress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const handleChangeAddress = (e: any) => {
    setAdress(e.target.value);
  };
  const handleChangeCity = (e: any) => {
    setCity(e.target.value);
  };
  const handleChangePostalCode = (e: any) => {
    setPostalCode(e.target.value);
  };
  const handleChangeCountry = (e: any) => {
    setCountry(e.target.value);
  };
  const handleSubmitShipping = (e: any) => {
    e.preventDefault();
    onSaveShippingAddress({
      address,
      city,
      postalCode,
      country,
    });
    history.push("/payment");
  };
  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      {/* we give the older and current step we are */}
      <CheckoutStep step1 step2 />

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Adresse de Livraison
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Utilisez une adresse permanente où vous pouvez recevoir vos
                courriers.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmitShipping}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Addresse de livraison
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        onChange={handleChangeAddress}
                        value={address}
                        autoComplete="street-address"
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pays
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="country"
                        required
                        value={country}
                        onChange={handleChangeCountry}
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <br />
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ville d'expédition
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        value={city}
                        onChange={handleChangeCity}
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Code Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        required
                        value={postalCode}
                        onChange={handleChangePostalCode}
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm hover:bg-pink-600 text-sm font-medium rounded-md text-white bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <span>Suivant</span>
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
    isLoading: state.cart.isLoading,
    shippingAddress: state.cart.shippingAddress,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSaveShippingAddress: (data: IShippingAddress) =>
      dispatch(actions.saveShippingAddress(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
