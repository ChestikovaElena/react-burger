import { getResponseData } from "../../utils/get-response-data";

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

const API_SOURCE = "https://norma.nomoreparties.space/api/password-reset";

export function resetPassword(email) {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    return fetch(API_SOURCE, {
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
          isResetingPassword: res.success
        });
      })
      .catch(error => {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      })
  }
}