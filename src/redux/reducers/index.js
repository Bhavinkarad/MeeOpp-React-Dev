import { combineReducers } from 'redux';
import user from './user';
import loader from './loader';


const reducer = combineReducers({
  user,
  loader,
});

export default reducer;
