import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../store/actions/authAction";

function Header() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = async () => {
    navigate("/profile");
  };

  const logout = async () => {
    dispatch(signOut(auth)).then(() => navigate("/login"));
  };

  return (
    <>
      <header className="flex border-b border-gray-200 px-8 z-30 py-4 shadow-md bg-mkt-600">
        <div className="flex items-center justify-left">
          <a href="#" className="text-2xl font-semibold text-white">
            AuthApp
          </a>
        </div>
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-gray-800"></div>
        <div className="flex items-center justify-right text-white dark:text-mkt-100">
          <ul className="flex items-center justify-center flex-shrink-0 space-x-6">
            <li
              className="relative cursor-pointer hover:underline"
              onClick={profile}
            >
              Profile
            </li>
            <li
              className="relative cursor-pointer hover:underline"
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
