import { UserApi } from "../../api/user.api";
import { USER_TYPE } from "../types/userType";
import { alertError } from "./alertAction";

export const getUser = (data) => async (dispatch) => {
  try {
    const resUser = await UserApi.get(data);
    dispatch({ type: USER_TYPE.GET_USER, payload: resUser.data.user });
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    dispatch(alertError(errorMessage));
    throw error;
  }
};
