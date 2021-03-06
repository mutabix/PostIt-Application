import axios from 'axios';
import toastr from 'toastr';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './actionTypes';

/**
 * Action creator for when signup is successful
 *
 * @param {Object} user
 *
 * @returns {Object} action
 */
const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  user
});

/**
 * Action creator for when signup fails
 *
 * @returns {Object} action
 */
const signupFailure = () => ({
  type: types.SIGNUP_FAILURE
});

/**
 * Action creator for when login is successful
 *
 * @param {Object} user
 *
 * @returns {Object} action
 */
const loginSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  user
});

/**
 * Action creator for when login fails
 *
 * @returns {Object} action
 */
const loginFailure = () => ({
  type: types.LOGIN_FAILURE
});

/**
 * Async action creator for signup
 *
 * @param {Object} userDetails
 *
 * @returns {Promise} dispatches an action
 */
const signup = userDetails => dispatch => axios
  .post('/api/user/signup', userDetails)
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(signupSuccess(response.data.user));
    toastr.success('Welcome to PostIt');
  })
  .catch((error) => {
    dispatch(signupFailure());
    toastr.error(error.response.data.message);
  });

/**
 * Async action creator for login
 *
 * @param {Object} userDetails
 *
 * @returns {Promise} dispatches an action
 */
const login = userDetails => dispatch => axios
  .post('/api/user/signin', userDetails)
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(loginSuccess(response.data.user));
    toastr.success('Welcome Back');
  })
  .catch((error) => {
    dispatch(loginFailure());
    toastr.error(error.response.data.message);
  });

/**
 * logout action creator
 *
 * @returns {Object} action
 */
const logout = () => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  return { type: types.LOGOUT };
};

/**
 * Checks the error message when an async action fails
 *
 * @param {string} errorMessage
 *
 * @returns {function} dispatch
 */
const checkError = errorMessage => (dispatch) => {
  if (errorMessage ===
    'Token is no longer valid so we can\'t authenticate you.') {
    toastr.error('Your session has expired.<br/>Please login again.');
    return dispatch(logout());
  }
  toastr.error(errorMessage);
};

export {
  signup, signupSuccess, signupFailure, login,
  loginSuccess, loginFailure, logout, checkError
};
