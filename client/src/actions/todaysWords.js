import { instance as axios } from '../axiosConfig';

import { getToken } from './authActions';
import {
  GET_TODAYS_WORDS,
  EDIT_TODAYS_WORDS,
  SET_IS_ANSWERED_TO_TRUE,
  SET_IS_CORRECT,
  UPDATE_TODAYS_WORDS_IN_DB,
  CALCULATE_WORDINDEX,
  TOKEN_AUTHENTICATION_FAILED,
  SET_IS_TODAYS_WORDS_ANSWERED
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
    axios.get('/todaysWords', getToken(getState)).then(response => {
      dispatch({
        type: GET_TODAYS_WORDS,
        payload: response.data
      });
      dispatch({ type: CALCULATE_WORDINDEX });
    }).catch(err => {
      dispatch({ type: TOKEN_AUTHENTICATION_FAILED });
    });
  }
}

export const updateTodaysWordsInDb = () => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_TODAYS_WORDS_IN_DB });
    axios.post('/updateTodaysWords', getState().words, getToken(getState)).catch(err => {
      console.log(err);
    });
    dispatch({ type: CALCULATE_WORDINDEX });
  }
}

export const setIsTodaysWordsAnswered = isTodaysWordsAnswered => {
  return dispatch => {
    dispatch({ type: SET_IS_TODAYS_WORDS_ANSWERED });
  }
}