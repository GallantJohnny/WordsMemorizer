import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  LOGOUT_USER,
  TOKEN_AUTHENTICATION_FAILED,
  TOKEN_AUTHENTICATION_SUCCESS
} from '../actions/types';

const initialState = {
  isLoading: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  name: null,
  email: null,
  token: localStorage.getItem('token'),
  errors: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTRATION_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token
      }
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
        errors: []
      }
    case LOGIN_FAILED:
    case REGISTRATION_FAILED:
      let errors = [...state.errors];
      errors.push(action.payload.error);
      return {
        ...state,
        isLoading: false,
        errors: errors
      }
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        name: null,
        email: null,
        token: null
      }
    case TOKEN_AUTHENTICATION_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        name: null,
        email: null,
      }
    case TOKEN_AUTHENTICATION_SUCCESS:
      return {
        isAuthenticated: true,
        isLoading: false,
        name: action.payload.name,
        email: action.payload.email,
      }
    default:
      return state;
  }
}