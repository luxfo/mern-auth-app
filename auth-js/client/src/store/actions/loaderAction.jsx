import { LOADER_TYPE } from "../types/loaderType";

export const loaderShow = () => async (dispatch) => {
  dispatch({
    type: LOADER_TYPE.SHOW,
    payload: true,
  });
};

export const loaderHide = () => async (dispatch) => {
  dispatch({
    type: LOADER_TYPE.HIDE,
    payload: false,
  });
};
