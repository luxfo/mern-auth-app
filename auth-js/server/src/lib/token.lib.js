import jwt from "jsonwebtoken";
import { Config } from "../config";

export const Token = {
  createAccess: async (payload) => {
    return jwt.sign(payload, Config.jwt_access, {
      expiresIn: "1d",
    });
  },

  createRefresh: async (payload) => {
    return jwt.sign(payload, Config.jwt_refresh, {
      expiresIn: "30d",
    });
  },

  verify: async (rf_token) => {
    return jwt.verify(rf_token, Config.jwt_refresh);
  },
};
