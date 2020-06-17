import { EDIT_TODAYS_WORDS, GET_TODAYS_WORDS } from '../actions/types';

const initialState = {
  isLoading: false,
  todaysWords: [
    {
      word: 'uncomfortable',
      solution: 'kényelmetlen',
      isAsked: false,
      isCorrect: false
    },
    {
      word: 'ugly',
      solution: 'ronda',
      isAsked: false,
      isCorrect: false
    },
    {
      word: 'ship',
      solution: 'hajó',
      isAsked: false,
      isCorrect: false
    },
    {
      word: 'outrageous',
      solution: 'felháborító',
      isAsked: false,
      isCorrect: false
    },
    {
      word: 'fence',
      solution: 'kerítés',
      isAsked: false,
      isCorrect: false
    }
  ]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODAYS_WORDS:
      return {
        ...state,
        todaysWords: [...state.todaysWords]
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