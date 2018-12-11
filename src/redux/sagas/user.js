import {
  all,
  fork,
  takeEvery,
  put,
} from 'redux-saga/effects';
import {
  CREATE_USER_REQ,
  createUserSuccess,
  createUserFail,
} from '../actions';

function* createUser(action) {

  try {
    yield put(createUserSuccess({}));
  } catch (error) {
    yield put(createUserFail(error));
  }
}


function* watcherCreateUser() {
  yield takeEvery(CREATE_USER_REQ, createUser);
}

export default function* userRoot() {
  yield all([
    fork(watcherCreateUser),
  ]);
}
