import { AuthApi } from "../../api/auth.api";
import { AUTH_TYPE } from "../types/authType";
import { loaderShow, loaderHide } from "./loaderAction";
import {
  alertSuccess,
  alertError,
  alertInfo,
  alertWarning,
} from "./alertAction";

const keyStorage = "auth";

export const register = (data) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.register(data);

    dispatch({
      type: AUTH_TYPE.ACTIVATE,
      payload: { user: res.data.user },
    });

    dispatch(alertSuccess(res.data.message.success));
    dispatch(alertWarning(res.data.message.warning));
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const activate = (data) => async (dispatch) => {
  try {
    dispatch(loaderShow());
    dispatch(alertWarning(""));

    const res = await AuthApi.activate(data);

    dispatch({
      type: AUTH_TYPE.ACTIVATE,
      payload: { user: res.data.user },
    });

    dispatch(alertSuccess(res.data.message.success));
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const sendVerificationCode = (data) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.sendVerificationCode(data);

    dispatch(alertSuccess(res.data.message.success));
    dispatch(alertWarning(res.data.message.warning));
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const signIn = (data) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.signIn(data);

    if (!res.data.user.activated) {
      dispatch({
        type: AUTH_TYPE.ACTIVATE,
        payload: { user: res.data.user },
      });

      dispatch(alertInfo(res.data.message.info));
      dispatch(alertWarning(res.data.message.warning));
    } else {
      localStorage.setItem(keyStorage, true);

      dispatch({
        type: AUTH_TYPE.LOGIN,
        payload: {
          user: res.data.user,
          token: res.data.token,
        },
      });
    }
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.forgotPassword(data);

    dispatch(alertSuccess(res.data.message.success));
    dispatch(alertWarning(res.data.message.warning));
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const resetPassword = (resetCode, data) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.resetPassword(resetCode, data);

    dispatch(alertSuccess(res.data.message.success));
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const signOut = (auth) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.signOut(auth);

    localStorage.removeItem(keyStorage);

    dispatch({
      type: AUTH_TYPE.LOGOUT,
    });

    dispatch(alertSuccess(res.data.message.success));
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const refreshToken = () => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const item = localStorage.getItem(keyStorage);
    if (item) {
      const res = await AuthApi.refreshToken();

      dispatch({
        type: AUTH_TYPE.LOGIN,
        payload: {
          user: res.data.user,
          token: res.data.token,
        },
      });
    }
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const generateOTP = (auth) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.generateOTP(auth);

    dispatch({
      type: AUTH_TYPE.GENERATE_OTP,
      payload: {
        otp_code: res.data.otp_code,
        otp_url: res.data.otp_url,
      },
    });
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const verifyOTP = (auth) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.verifyOTP(auth);

    dispatch({
      type: AUTH_TYPE.VERIFY_OTP,
      payload: {
        otp_verified: res.data.otp_verified,
        otp_enable: res.data.otp_enabled,
      },
    });
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const validateOTP = (auth) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.validateOTP(auth);

    dispatch({
      type: AUTH_TYPE.VALIDATE_OTP,
      payload: {
        otp_valid: res.data.otp_valid,
      },
    });
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};

export const disableOTP = (auth) => async (dispatch) => {
  try {
    dispatch(loaderShow());

    const res = await AuthApi.disableOTP(auth);

    dispatch({
      type: AUTH_TYPE.DISABLE_OTP,
      payload: {
        otp_enabled: res.data.otp_enabled,
      },
    });
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  } finally {
    dispatch(loaderHide());
  }
};
