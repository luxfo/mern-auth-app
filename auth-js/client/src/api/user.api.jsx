import axios from "axios";
import { BACKEND_URL } from "../Config";

const userApi = axios.create({
  baseURL: BACKEND_URL + "/user",
  withCredentials: true,
});

userApi.defaults.headers.common["Content-Type"] = "application/json";

export const UserApi = {
  get: async (auth) => {
    const res = await userApi.get("/" + auth.user.id, {
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    });
    return res;
  },
};
