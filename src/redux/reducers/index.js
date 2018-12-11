import { combineReducers } from 'redux';
import users from './user';
import loader from './loader';


const reducer = combineReducers({
  users,
  loader,
});

export default reducer;
