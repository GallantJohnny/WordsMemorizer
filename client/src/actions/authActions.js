import { instance as axios } from '../axiosConfig';

import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  LOGOUT_USER,
  TOKEN_AUTHENTICATION_FAILED,
  TOKEN_AUTHENTICATION_SUCCESS
} from './types';

export const authToken = (token) => {
  return dispatch => {
    dispatch({ type: USER_LOADING });
    axios.post('/authToken', { token }).then(res => {
      console.log(res);
      dispatch({
        type: TOKEN_AUTHENTICATION_SUCCESS,
        payload: {
          name: res.data.name,
          email: res.data.email
        }
      });
    }).catch(err => {
      dispatch({
        type: TOKEN_AUTHENTICATION_FAILED
      });
    })
  }
}

export const login = (email, password) => {
  console.log(email);
  console.log(password);
  return dispatch => {
    dispatch({ type: USER_LOADING });
    axios.post('/login', { email, password })
      .then(res => {
        console.log(res);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: res.data.token
          }
        })
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAILED,
          payload: {
            error: err.response.data.msg
          }
        });
      });
  }
}

export const register = (email, password, name) => {
  return dispatch => {
    dispatch({ type: USER_LOADING });
    axios.post('/register', { email, password, name })
      .then(res => {
        dispatch({
          type: REGISTRATION_SUCCESS,
          payload: {
            name: res.data.name,
            email: res.data.email,
            token: res.data.token
          }
        })
      })
      .catch(err => {
        dispatch({
          type: REGISTRATION_FAILED,
          payload: {
            error: err.response.data.msg
          }
        })
      })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({ type: LOGOUT_USER });
  }
}

export const getToken = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }

  if (token) config.headers['x-auth-token'] = token;

  return config;
}
