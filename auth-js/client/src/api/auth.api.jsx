import axios from "axios";
import { BACKEND_URL } from "../Config";

const authApi = axios.create({
  baseURL: BACKEND_URL + "/auth",
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const AuthApi = {
  register: async (data) => {
    const res = await authApi.post("/register", data);
    return res;
  },

  activate: async (data) => {
    const res = await authApi.get("/activate/" + data);
    return res;
  },

  sendVerificationCode: async (data) => {
    const res = await authApi.get("/sendverificationcode/" + data);
    return res;
  },

  forgotPassword: async (data) => {
    const res = await authApi.post("/forgotpassword", data);
    return res;
  },

  resetPassword: async (resetCode, data) => {
    const res = await authApi.patch("/resetpassword/" + resetCode, data);
    return res;
  },

  signIn: async (data) => {
    const res = await authApi.post(
      "/signin",
      { email: data.email, password: data.password },
      {
        withCredentials: true,
        headers: { crossDomain: true, "Content-Type": "application/json" },
      }
    );
    return res;
  },

  refreshToken: async () => {
    const res = await authApi.post("/refresh-token");
    return res;
  },

  signOut: async (auth) => {
    const res = await authApi.delete("/signout", {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    return res;
  },

  generateOTP: async (auth) => {
    const res = await authApi.post(
      "/otp/generate",
      { user_id: auth.user.id },
      {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }
    );
    return res;
  },

  verifyOTP: async (auth) => {
    const res = await authApi.post(
      "/otp/verify",
      { user_id: auth.user.id, otp_code: auth.user.otp_code },
      {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }
    );
    return res;
  },

  validateOTP: async (auth) => {
    const res = await authApi.post(
      "/otp/validate",
      { user_id: auth.user.id },
      {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }
    );
    return res;
  },

  disableOTP: async (auth) => {
    const res = await authApi.post(
      "/otp/disable",
      { user_id: auth.user.id },
      {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      }
    );
    return res;
  },
};
