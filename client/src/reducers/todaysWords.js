import deepCopy from './deepCopy';
import {
  EDIT_TODAYS_WORDS,
  GET_TODAYS_WORDS,
  SET_IS_CORRECT,
  SET_IS_ANSWERED_TO_TRUE,
  UPDATE_TODAYS_WORDS_IN_DB,
  CALCULATE_WORDINDEX
} from '../actions/types';

const initialState = {
  isLoading: false,
  score: 0,
  createdDate: null,
  id: null,
  wordIndex: 0,
  todaysWords: []
}

export default function (state = initialState, action) {
  let newState = deepCopy(state);
  switch (action.type) {
    case CALCULATE_WORDINDEX:
      let wordIndex = 0;
      newState.todaysWords.forEach((todayWord, index) => {
        console.log(todayWord);
        console.log(index);
        if (todayWord.isAnswered) {
          wordIndex = index + 1;
          return;
        }
      });
      newState.wordIndex = wordIndex;
      return newState;
    case GET_TODAYS_WORDS:
      newState.todaysWords = action.payload.todaysWords;
      newState.id = action.payload.id;
      newState.createdDate = action.payload.createdDate;
      return newState;
    case SET_IS_CORRECT:
      newState.todaysWords[action.payload.index].isCorrect = action.payload.isCorrect;
      return newState;
    case SET_IS_ANSWERED_TO_TRUE:
      newState.todaysWords[action.payload.index].isAnswered = true;
      return newState;
    case UPDATE_TODAYS_WORDS_IN_DB:

    default:
      return newState;
  }
}