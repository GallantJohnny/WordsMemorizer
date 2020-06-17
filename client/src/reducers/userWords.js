import deepCopy from './deepCopy';
import {
  GET_WORDS,
  WORDS_FETCH_FAILED,
  WORDS_FETCH_SUCCESSFULL,
  FAILED_TO_ADD_WORD,
  WORD_ADDED,
  DELETE_WORD,
  WORD_UPDATED
} from '../actions/types';

const initialState = {
  isLoading: false,
  words: [],
  errors: []
}

export default function (state = initialState, action) {
  let newState = deepCopy(state);
  switch (action.type) {
    case WORD_ADDED:
      newState.isLoading = false;
      console.log(newState);
      return newState;
    case FAILED_TO_ADD_WORD:
      newState.errors.push(action.payload.error);
      return newState;
    case WORD_UPDATED:
    case GET_WORDS:
      newState.isLoading = true;
      return newState;
    case WORDS_FETCH_SUCCESSFULL:
      newState.words = action.payload;
      newState.isLoading = false;
      return newState;
    case WORDS_FETCH_FAILED:
      newState.isLoading = false;
      newState.errors = action.payload.errors;
      return newState;
    case DELETE_WORD:
      let index = null;
      newState.words.forEach((word, currentIndex) => {
        if (word._id === action.payload.wordId) index = currentIndex;
      });
      console.log(index);
      newState.words.splice(index, 1);
      return newState;
    default:
      return state;
  }
}