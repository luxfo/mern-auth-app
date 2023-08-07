import { USER_TYPE } from "../types/userType";

const initialState = { data: {} };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPE.GET_USER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
