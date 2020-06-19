import { EDIT_TODAYS_WORDS, GET_TODAYS_WORDS } from '../actions/types';

const initialState = {
  isLoading: false,
  score: 0,
  createdDate: null,
  id: null,
  todaysWords: []
}

export default function (state = initialState, action) {
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