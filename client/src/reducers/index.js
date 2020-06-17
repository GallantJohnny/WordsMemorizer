import {combineReducers} from 'redux';
import auth from './authReducer';
import todaysWords from './todaysWords';
import userWords from './userWords';

export default combineReducers({
  auth: auth,
  words: todaysWords,
  userWords: userWords
});