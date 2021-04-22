import { Link } from "react-router-dom";

const CheckoutStep = (props: {
  step1?: any;
  step2?: any;
  step3?: any;
  step4?: any;
}) => {
  const { step1, step2, step3, step4 } = props;

  return (
    <div className="w-full pb-12 pt-6">
      <div className="flex">
        <div className="w-1/4">
          <div className="relative mb-2">
            {step1 ? (
              <Link to="/login" className="space-y-2">
                <div className="w-10 h-10 mx-auto bg-pink-500 rounded-full text-lg text-white flex items-center justify-center">
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <p className="text-xs text-center md:text-base">Se connecter</p>
              </Link>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <p className="text-xs text-center md:text-base">Se connecter</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            {/* {step1 ? ( */}
            {step2 ? (
              <>
                {" "}
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: "calc(100% - 2.5rem - 1rem)",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className="w-0 bg-pink-300 py-1 rounded"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
                <Link to="/shipping" className="space-y-2">
                  <div className="w-10 h-10 mx-auto bg-pink-500 rounded-full text-lg text-white flex items-center justify-center">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: "calc(100% - 2.5rem - 1rem)",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className="w-0 bg-pink-300 py-1 rounded"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="text-xs text-center md:text-base">
            Adresse de Livraison
          </div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            {/* {step1 ? ( */}
            {step3 ? (
              <>
                {" "}
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: "calc(100% - 2.5rem - 1rem)",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className="w-0 bg-pink-300 py-1 rounded"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
                <Link to="/payment" className="space-y-2">
                  <div className="w-10 h-10 mx-auto bg-pink-500 rounded-full text-lg text-white flex items-center justify-center">
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: "calc(100% - 2.5rem - 1rem)",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className="w-0 bg-pink-300 py-1 rounded"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="text-xs text-center md:text-base">Payement</div>
        </div>

        <div className="w-1/4">
          <div className="relative mb-2">
            {/* {step1 ? ( */}
            {step4 ? (
              <>
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: "calc(100% - 2.5rem - 1rem)",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className="w-0 bg-pink-300 py-1 rounded"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
                <Link to="/placeorder" className="space-y-2">
                  <div className="w-10 h-10 mx-auto bg-pink-500 rounded-full text-lg text-white flex items-center justify-center">
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: "calc(100% - 2.5rem - 1rem)",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className="w-0 bg-pink-300 py-1 rounded"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="text-xs text-center md:text-base">
            Détails de l'achat
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStep;
