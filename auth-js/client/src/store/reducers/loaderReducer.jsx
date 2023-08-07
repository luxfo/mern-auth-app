import { LOADER_TYPE } from "../types/loaderType";

const initialState = {
  loading: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER_TYPE.SHOW:
      return { loading: action.payload };
    case LOADER_TYPE.HIDE:
      return { loading: action.payload };
    default:
      return state;
  }
};

export default loaderReducer;
