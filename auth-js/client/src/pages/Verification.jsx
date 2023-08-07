import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendVerificationCode, activate } from "../store/actions/authAction";
import { validateInput } from "../utils/validate";
import { CgSpinner } from "react-icons/cg";

function Verification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, alert, auth } = useSelector((state) => state);

  const [input, setInput] = useState({ verificationCode: "" });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(validateInput(e));
  };

  const handleBlur = (e) => {
    setError(validateInput(e, input));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(activate(input.verificationCode));
      navigate("/login");
    } catch (error) {}
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    dispatch(sendVerificationCode(auth.user.id));
  };

  return (
    <>
      <div className="flex h-screen items-center bg-gray-50 justify-center py-12 px-4 sm:px-6 lg:px-8">
        <form
          className="w-full max-w-md rounded-md shadow-md shadow-gray-500"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="bg-mkt-600 rounded-t-md">
            <h2 className="p-4 text-center text-3xl font-bold tracking-tight text-white">
              Verification
            </h2>
          </div>
          <div className="m-4 p-4 space-y-6">
            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={input.verificationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Verification Code"
                />
                {error.verificationCode && (
                  <span className="px-2 text-red-500 text-sm">
                    {error.verificationCode}
                  </span>
                )}
              </div>
            </div>

            {alert.warning && (
              <div className="relative block w-full text-green-500 sm:text-sm">
                {alert.warning}
              </div>
            )}

            <div>
              <button
                id="btnVerify"
                name="btnVerify"
                type="submit"
                disabled={
                  input.verificationCode && !loader.loading ? false : true
                }
                className={
                  "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white" +
                  (input.verificationCode && !loader.loading
                    ? " cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    : " cursor-not-allowed bg-indigo-200")
                }
              >
                {!loader.loading ? (
                  "Verify"
                ) : (
                  <CgSpinner className="animate-spin h-5 w-5 text-white" />
                )}
              </button>
            </div>
            <div>
              <span className="text-gray-900 text-sm">
                <button
                  onClick={handleOnClick}
                  className="mx-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Send me a new code
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Verification;
