import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../store/actions/authAction";
import { validateInput } from "../utils/validate";
import { CgSpinner } from "react-icons/cg";

function Login() {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setError(validateInput(e, input));
  };

  const handleBlur = (e) => {
    setError(validateInput(e, input));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(signIn(input));
      navigate("/verification");
    } catch (error) {}
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
              AuthApp
            </h2>
          </div>
          <div className="m-4 p-4 space-y-6">
            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={input.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
                {error.email && (
                  <span className="px-2 text-red-500 text-sm">
                    {error.email}
                  </span>
                )}
              </div>
            </div>

            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
                {error.password && (
                  <span className="px-2 text-red-500 text-sm">
                    {error.password}
                  </span>
                )}
              </div>
            </div>

            <span className="flex justify-end">
              <NavLink
                to="/forgotpassword"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Forgot password?
              </NavLink>
            </span>

            <div>
              <button
                type="submit"
                disabled={
                  input.email && input.password && !loader.loading
                    ? false
                    : true
                }
                className={
                  "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white " +
                  (input.email && input.password && !loader.loading
                    ? " cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    : " cursor-not-allowed bg-indigo-200")
                }
              >
                {!loader.loading ? (
                  "Sign In"
                ) : (
                  <CgSpinner className="animate-spin h-5 w-5 text-white" />
                )}
              </button>
            </div>
            <div>
              <span className="text-gray-900 text-sm">Need an account?</span>
              <NavLink
                to="/registration"
                className="mx-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Register here
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
