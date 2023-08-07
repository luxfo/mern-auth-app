import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { generateOTP, disableOTP } from "../store/actions/authAction";
import TwoFactorAuth from "../components/TwoFactorAuth";

const ProfilePage = () => {
  const { user, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const generateQrCode = async () => {
    await dispatch(generateOTP(auth));

    setOpenModal(true);
  };

  const disable2FA = async () => {
    await dispatch(disableOTP(auth));
  };

  return (
    <>
      <div className="mx-auto">
        {user && (
          <>
            <div className="bg-gray-200 max-w-4xl p-12 mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex gap-20 justify-center items-start">
              <div className="flex-grow-2">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <div className="mt-8">
                  <p className="mb-4">
                    Name: {user.data.first_name + " " + user.data.last_name}
                  </p>
                  <p className="mb-4">Email: {user.data.email}</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">
                  Two Facto Authentication (2FA)
                </h3>
                <p className="mb-4">
                  Secure your account with TOTP two-factor authentication.
                </p>
                {user.otp_enabled && user.otp_enabled ? (
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                    onClick={disable2FA}
                  >
                    Disable 2FA
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                    onClick={generateQrCode}
                  >
                    Setup 2FA
                  </button>
                )}
              </div>
            </div>
            {openModal && (
              <TwoFactorAuth closeModal={() => setOpenModal(false)} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
