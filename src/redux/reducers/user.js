import {
  CREATE_USER_REQ,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
} from '../actions';

const currentUser = (state = [], action) => {
  switch (action.type) {
    case CREATE_USER_REQ:
      return state;
    case CREATE_USER_FAIL:
      return state;
    case CREATE_USER_SUCCESS:
      return [
        ...state, action.data,
      ];
    default:
      return state;
  }
};

export default currentUser;
