import deepCopy from './deepCopy';
import {
  EDIT_TODAYS_WORDS,
  GET_TODAYS_WORDS,
  SET_IS_CORRECT,
  SET_IS_ANSWERED_TO_TRUE
} from '../actions/types';

const initialState = {
  isLoading: false,
  score: 0,
  createdDate: null,
  id: null,
  todaysWords: []
}

export default function (state = initialState, action) {
  let newState = deepCopy(state);
  switch (action.type) {
    case GET_TODAYS_WORDS:
      return {
        ...state,
        todaysWords: action.payload.todaysWords,
        id: action.payload.id,
        createdDate: action.payload.createdDate
      }
    case EDIT_TODAYS_WORDS:
      return {
        ...state,
        todaysWords: [...action.payload]
      }
    default:
      return state;
  }
}