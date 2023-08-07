import { ALERT_TYPE } from "../types/alertType";

const initialState = {
  success: "",
  error: "",
  info: "",
  warning: "",
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_TYPE.SUCCESS:
      return { ...state, success: action.payload };
    case ALERT_TYPE.INFO:
      return { ...state, info: action.payload };
    case ALERT_TYPE.ERROR:
      return { ...state, error: action.payload };
    case ALERT_TYPE.WARNING:
      return { ...state, warning: action.payload };
    default:
      return state;
  }
};

export default alertReducer;
