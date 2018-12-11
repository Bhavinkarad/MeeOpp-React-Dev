import {
  fork,
  all,
} from 'redux-saga/effects';
import userRoot from './user';

export default function* root() {
  yield all([
    fork(userRoot),
  ]);
}
