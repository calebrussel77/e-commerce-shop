import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { useState } from "react";
import { IShippingAddress, IState } from "../../types/types.models";
import CheckoutStep from "../../components/CheckoutStep/CheckoutStep";
import PaypalSvg from "../../assets/svgs/Paypal.svg";
import StripeSvg from "../../assets/svgs/Stripe.svg";

const Payment = (props: {
  history: any;
  shippingAddress: IShippingAddress;
  paymentMethodProps: string;
  onSavePaymentMethod: (paymentMethod: string) => void;
}) => {
  const {
    shippingAddress,
    history,
    onSavePaymentMethod,
    paymentMethodProps,
  } = props;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState(paymentMethodProps);

  const handleChangePaymentMethod = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmitShipping = (e: any) => {
    e.preventDefault();
    onSavePaymentMethod(paymentMethod);
    history.push("/placeorder");
  };
  return (
    <div className="animate__animated animate__fadeIn max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      {/* we give the older and current step we are */}
      <CheckoutStep step1 step2 step3 />

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Methode de Payement
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Choisissez votre methode de payement selon votre convenance.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmitShipping}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="border border-gray-300 divide-y divide-gray-300 rounded-lg">
                    <div className="p-5 cursor-pointer hover:bg-pink-50 transition ease-in-out duration-150">
                      <label className="inline-flex items-center space-x-2 w-full h-full">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-pink-500 focus:ring-pink-500"
                          name="paymentMethod"
                          value="Paypal"
                          checked={paymentMethod === "Paypal"}
                          onChange={handleChangePaymentMethod}
                        />
                        <div className="inline-flex space-x-1 items-center">
                          <img
                            src={PaypalSvg}
                            className="h-9 w-auto"
                            alt="Paypal"
                          />
                        </div>
                      </label>
                    </div>
                    <div className="p-5 cursor-pointer hover:bg-pink-50 transition ease-in-out duration-150">
                      <label className="inline-flex items-center space-x-2 w-full h-full">
                        <input
                          type="radio"
                          className="form-radio h-4 w-4 text-pink-500 focus:ring-pink-500"
                          name="paymentMethod"
                          onChange={handleChangePaymentMethod}
                          checked={paymentMethod === "Stripe"}
                          value="Stripe"
                        />
                        <div className="inline-flex space-x-1 items-center">
                          <img
                            src={StripeSvg}
                            className="h-9 w-auto"
                            alt="Stripe"
                          />
                        </div>
                      </label>
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
    shippingAddress: state.cart.shippingAddress,
    paymentMethodProps: state.cart.paymentMethod,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSavePaymentMethod: (data: string) =>
      dispatch(actions.savePaymentMethod(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
