import { ALERT_TYPE } from "../types/alertType";

export const alertSuccess = (data) => async (dispatch) => {
  dispatch({
    type: ALERT_TYPE.SUCCESS,
    payload: data,
  });
};

export const alertError = (data) => async (dispatch) => {
  dispatch({
    type: ALERT_TYPE.ERROR,
    payload: data,
  });
};

export const alertInfo = (data) => async (dispatch) => {
  dispatch({
    type: ALERT_TYPE.INFO,
    payload: data,
  });
};

export const alertWarning = (data) => async (dispatch) => {
  dispatch({
    type: ALERT_TYPE.WARNING,
    payload: data,
  });
};
