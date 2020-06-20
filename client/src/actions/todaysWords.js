import { instance as axios } from '../axiosConfig';

import { getToken } from './authActions';
import {
  GET_TODAYS_WORDS,
  EDIT_TODAYS_WORDS,
  SET_IS_ANSWERED_TO_TRUE,
  SET_IS_CORRECT
} from './types';

export const modifyTodaysWords = modifiedWords => {
  return {
    type: EDIT_TODAYS_WORDS,
    payload: modifiedWords
  }
}

export const setIsCorrect = isCorrect => {
  return {
    type: SET_IS_CORRECT,
    payload: isCorrect
  }
}

export const setIsAnsweredToTrue = () => {
  return {
    type: SET_IS_ANSWERED_TO_TRUE
  }
}

export const getTodaysWords = () => {
  return (dispatch, getState) => {
    axios.get('/todaysWords', getToken(getState)).then(todaysWords => {
      dispatch({
        type: GET_TODAYS_WORDS,
        payload: todaysWords.data
      });
    }).catch(err => console.log(err));

  }
}