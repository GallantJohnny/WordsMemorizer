import { GET_TODAYS_WORDS, EDIT_TODAYS_WORDS } from './types';
import { instance as axios } from '../axiosConfig';

import { getToken } from './authActions';

export const modifyTodaysWords = (modifiedWords) => {
  return {
    type: EDIT_TODAYS_WORDS,
    payload: modifiedWords
  }
}

export const getTodaysWords = () => {
  return (dispatch, getState) => {
    axios.get('/todaysWords', getToken(getState)).then(todaysWords => {
      dispatch({
        type: GET_TODAYS_WORDS
      });
    }).catch(err => console.log(err));

  }
}