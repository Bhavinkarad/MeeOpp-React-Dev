export const CREATE_USER_REQ = 'CREATE_USER_REQ';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

export const createUserReq = data => ({
  type: CREATE_USER_REQ,
  data,
});

export const createUserSuccess = data => ({
  type: CREATE_USER_SUCCESS,
  data,
});

export const createUserFail = error => ({
  type: CREATE_USER_FAIL,
  error,
});
