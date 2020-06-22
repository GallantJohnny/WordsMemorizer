import { instance as axios } from '../axiosConfig';

import { getToken } from './authActions';
import {
  GET_TODAYS_WORDS,
  EDIT_TODAYS_WORDS,
  SET_IS_ANSWERED_TO_TRUE,
  SET_IS_CORRECT,
  UPDATE_TODAYS_WORDS_IN_DB
} from './types';

export const modifyTodaysWords = modifiedWords => {
  return {
    type: EDIT_TODAYS_WORDS,
    payload: modifiedWords
  }
}

export const setIsCorrect = (isCorrect, index) => {
  return {
    type: SET_IS_CORRECT,
    payload: { isCorrect, index }
  }
}

export const setIsAnsweredToTrue = index => {
  return {
    type: SET_IS_ANSWERED_TO_TRUE,
    payload: { index }
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

export const updateTodaysWordsInDb = () => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TODAYS_WORDS_IN_DB
    });
    axios.post('/updateTodaysWords', getState().words, getToken(getState)).catch(err => {
      console.log(err);
    })
  }
}