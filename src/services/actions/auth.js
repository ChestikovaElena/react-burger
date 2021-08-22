import { getResponseData } from "../../utils/get-response-data";

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILED = 'LOG_IN_FAILED';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILED = 'RESTORE_PASSWORD_FAILED';

const API_SOURCE_PASSWORD_RESET = "https://norma.nomoreparties.space/api/password-reset";
const API_SOURCE_PASSWORD_RESTORE = "https://norma.nomoreparties.space/api/password-reset/reset";
const API_SOURCE_REGISTRATE = "https://norma.nomoreparties.space/api/auth/register";
const API_SOURCE_LOGIN = "https://norma.nomoreparties.space/api/auth/login";

export function resetPassword(email) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    return fetch(API_SOURCE_PASSWORD_RESET, {
      method: 'POST',
      body: JSON.stringify({"email": email}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          isResetPassword: res.success
        });
      })
      .catch(error => {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      })
  }
}

export function restorePassword(password, accessToken) {
  return function(dispatch) {
    dispatch({
      type: RESTORE_PASSWORD_REQUEST
    });
    return fetch(API_SOURCE_PASSWORD_RESTORE, {
      method: 'POST',
      body: JSON.stringify({"password": password, "token": accessToken}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: RESTORE_PASSWORD_SUCCESS,
          isRestorePassword: res.success
        });
      })
      .catch(error => {
        dispatch({
          type: RESTORE_PASSWORD_FAILED
        });
      })
  }
}

export function registrate(email, password, name) {
  return function(dispatch) {
    dispatch({
      type: SIGN_IN_REQUEST
    });
    return fetch(API_SOURCE_REGISTRATE, {
      method: 'POST',
      body: JSON.stringify({"email": email, "password": password, "name": name}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(getResponseData)
      .then(res => {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }
        dispatch({
          type: SIGN_IN_SUCCESS,
          accessToken: authToken,
        });
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch(error => {
        dispatch({
          type: SIGN_IN_FAILED
        });
      })
  }
}

export function logIn(email, password) {
  return function(dispatch) {
    dispatch({
      type: LOG_IN_REQUEST
    });
    return fetch(API_SOURCE_LOGIN, {
      method: 'POST',
      body: JSON.stringify({"email": email, "password": password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(getResponseData)
      .then(res => {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }
        dispatch({
          type: LOG_IN_SUCCESS,
          accessToken: authToken,
        });
        localStorage.setItem("refreshToken", res.refreshToken);
      })
      .catch(error => {
        dispatch({
          type: LOG_IN_FAILED
        });
      })
  }
}