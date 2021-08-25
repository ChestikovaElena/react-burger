import { getResponseData } from "../../utils/get-response-data";
import { getCookie, setCookie, deleteCookie } from "../../utils/cookie";

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILED = 'LOG_IN_FAILED';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILED = 'LOG_OUT_FAILED';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILED = 'RESTORE_PASSWORD_FAILED';

const API_SOURCE = "https://norma.nomoreparties.space/api/";

export function resetPassword(email) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    return fetch(`${API_SOURCE}password-reset`, {
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
    return fetch(`${API_SOURCE}password-reset/reset`, {
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
    return fetch(`${API_SOURCE}auth/register`, {
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
        });
        setCookie("accessToken", authToken, 5);
        localStorage.setItem('refreshToken', res.refreshToken);
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
    return fetch(`${API_SOURCE}auth/login`, {
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
        });
        setCookie("accessToken", authToken, 5);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch(error => {
        dispatch({
          type: LOG_IN_FAILED
        });
      })
  }
}

export function logOut(refreshToken) {
  return function(dispatch) {
    dispatch({
      type: LOG_OUT_REQUEST
    });
    return fetch(`${API_SOURCE}auth/logout`, {
      method: 'POST',
      body: JSON.stringify({"token": `{{${refreshToken}}}` }),
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
        });
        setCookie("accessToken", authToken, 5);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch(error => {
        dispatch({
          type: LOG_IN_FAILED
        });
      })
  }
}

export function getUserData() {
  return function(dispatch) {
    dispatch({
      type: GET_USER_DATA_REQUEST
    });
    return fetch(`${API_SOURCE}auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ` + getCookie('accessToken')
      }
    })
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          user: res.user
        });
      })
      .catch(error => {
        error.then(
          error => {
            if (error.message === "jwt malformed") {
              dispatch(refreshToken(getUserData()))
            } else {
              dispatch({
                type: GET_USER_DATA_FAILED
              });
            }
          }
        );
      })
  }
}

export function refreshToken(afterRefresh) {
  return function(dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    });
    return fetch(`${API_SOURCE}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"token": localStorage.getItem('refreshToken')})
    })
      .then(getResponseData)
      .then(res => {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }
        dispatch({
          type: REFRESH_TOKEN_SUCCESS
        });
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', authToken, 5);
        dispatch(afterRefresh);
      })
      .catch(error => {
        dispatch({
          type: REFRESH_TOKEN_FAILED
        });
      })
  }
}