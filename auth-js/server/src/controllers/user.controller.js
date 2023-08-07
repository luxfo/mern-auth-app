import { httpStatusCode } from "../lib/constants.lib";
import { ApiError } from "../lib/error.lib";
import User from "../models/user";

export const UserController = {
  get: async (p_req, p_res, p_next) => {
    try {
      console.log("UserController: get");

      const { id } = p_req.params;

      const _user = await User.findById(id);
      //console.log(_user);
      if (!_user)
        throw new ApiError(httpStatusCode.BAD_REQUEST, "User not exists");

      return p_res.json({ user: _user });
    } catch (error) {
      return p_next(error);
    }
  },
};
