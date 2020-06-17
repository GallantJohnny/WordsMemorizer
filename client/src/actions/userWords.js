import { instance as axios } from '../axiosConfig';
import { getToken } from './authActions';

import {
  GET_WORDS,
  WORD_ADDED,
  FAILED_TO_ADD_WORD,
  DELETE_WORD,
  WORDS_FETCH_SUCCESSFULL,
  WORDS_FETCH_FAILED,
  WORD_UPDATED
} from './types';

export const addWord = (newWord) => {
  return (dispatch, getState) => {
    const body = { newWord }
    console.log(body);
    axios.post('/addWord', body, getToken(getState)).then(() => {
      dispatch({
        type: WORD_ADDED
      });
    }).catch(err => {
      dispatch({
        type: FAILED_TO_ADD_WORD,
        payload: {
          error: 'Ooops... Failed to save your brand new word.'
        }
      })
    })
  }
}

export const getWords = () => {
  return (dispatch, getState) => {
    dispatch({ type: GET_WORDS });
    axios.get('/userWords', getToken(getState)).then(resp => {
      console.log(resp.data);
      dispatch({
        type: WORDS_FETCH_SUCCESSFULL,
        payload: resp.data
      })
    }).catch(err => {
      dispatch({
        type: WORDS_FETCH_FAILED,
        payload: {
          error: 'Failed to get word from your vocabulary...'
        }
      })
    })
  }
}

export const deleteWord = (wordId) => {
  console.log(wordId);
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_WORD,
      payload: { wordId }
    });
    axios.delete(`/deleteWord/${wordId}`, getToken(getState)).then(() => {
    }).catch();
  }
}

export const modifyWord = (wordId, updatedWord) => {
  console.log(wordId);
  console.log(updatedWord);
  return (dispatch, getState) => {
    console.log(getToken(getState));
    axios.post(`/modifyWord/${wordId}`, updatedWord, getToken(getState)).then(() => {
      dispatch({ type: WORD_UPDATED });
    });
  }
}