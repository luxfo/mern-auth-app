import { AUTH_TYPE } from "../types/authType";

const initialState = {
  user: {},
  token: "",
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPE.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case AUTH_TYPE.ACTIVATE: {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    case AUTH_TYPE.LOGOUT:
      return {
        ...state,
        user: {},
        token: "",
        isAuthenticated: false,
      };
    case AUTH_TYPE.GENERATE_OTP:
      return {
        ...state,
        user: {
          ...state.user,
          otp_code: action.payload.otp_code,
          otp_url: action.payload.otp_url,
        },
      };
    case AUTH_TYPE.VERIFY_OTP:
      return {
        ...state,
        user: {
          ...state.user,
          otp_verified: action.payload.otp_verified,
          otp_enabled: action.payload.otp_enabled,
        },
      };
    case AUTH_TYPE.VALIDATE_OTP:
      return {
        ...state,
        user: { ...state.user, otp_valid: action.payload.otp_valid },
      };
    case AUTH_TYPE.DISABLE_OTP:
      return {
        ...state,
        user: { ...state.user, otp_enabled: action.payload.otp_enabled },
      };
    default:
      return state;
  }
};

export default authReducer;
