import {
  LOADER_SHOW,
  LOADER_HIDE,
} from '../actions';

const INITIAL_STATE = {
  isLoading: false,
};

const loader = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADER_SHOW:
      return {
        isLoading: action.data,
      };
    case LOADER_HIDE:
      return {
        isLoading: action.data,
      };
    default:
      return state;
  }
};

export default loader;
