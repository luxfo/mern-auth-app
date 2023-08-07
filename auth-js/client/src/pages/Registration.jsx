import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/authAction";
import { validateInput } from "../utils/validate";
import { CgSpinner } from "react-icons/cg";

function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alert, loader, auth } = useSelector((state) => state);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      await dispatch(register(input));
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
              Registration
            </h2>
          </div>
          <div className="m-4 p-4 space-y-6">
            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="firstName"
                  value={input.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First Name"
                />
                {error.firstName && (
                  <span className="px-2 text-red-500 text-sm">
                    {error.firstName}
                  </span>
                )}
              </div>
            </div>
            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="lastName"
                  value={input.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Last Name"
                />
                {error.lastName && (
                  <span className="px-2 text-red-500 text-sm">
                    {error.lastName}
                  </span>
                )}
              </div>
            </div>
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

            <div className="-space-y-px rounded-md">
              <div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
                {error.confirmPassword && (
                  <span className="px-2 text-red-500 text-sm">
                    {error.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={
                  !Object.values(error).every((x) => x === null || x === "") ||
                  !Object.values(input).every((x) => x != null && x != "") ||
                  loader.loading
                }
                className={
                  "group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white" +
                  (!Object.values(error).every((x) => x === null || x === "") ||
                  !Object.values(input).every((x) => x != null && x != "") ||
                  loader.loading
                    ? " bg-indigo-200 cursor-not-allowed"
                    : " bg-indigo-600  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2")
                }
              >
                {!loader.loading ? (
                  "Save"
                ) : (
                  <CgSpinner className="animate-spin h-5 w-5 text-white" />
                )}
              </button>
            </div>
            <div>
              <span className="text-gray-900 text-sm">
                You already have an account?
              </span>
              <NavLink
                to="/login"
                className="mx-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Sign In
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Registration;
