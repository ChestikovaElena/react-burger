import { getResponseData } from "../../utils/get-response-data.js";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { LIFE_OF_COOKIE_IN_MINUTES } from "../../utils/constants";
import { CLEAR_SELECTED_INGREDIENTS } from "../actions/data-selected";
import {
  resetPasswordRequest,
  restorePasswordRequest,
  registrateRequest,
  logInRequest,
  logOutRequest,
  getUserDataRequest,
  patchUserDataRequest,
  refreshTokenRequest
} from "../api";
import { AppDispatch } from "../types";
import { TPayloadUser, TUser } from "../types/data";

export const LOG_IN_REQUEST: 'LOG_IN_REQUEST' = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS: 'LOG_IN_SUCCESS' = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILED: 'LOG_IN_FAILED' = 'LOG_IN_FAILED';

export const LOG_OUT_REQUEST: 'LOG_OUT_REQUEST' = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS' = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILED: 'LOG_OUT_FAILED' = 'LOG_OUT_FAILED';

export const SIGN_IN_REQUEST: 'SIGN_IN_REQUEST' = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS' = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILED: 'SIGN_IN_FAILED' = 'SIGN_IN_FAILED';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

export const GET_USER_DATA_REQUEST: 'GET_USER_DATA_REQUEST' = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';

export const PATCH_USER_DATA_REQUEST: 'PATCH_USER_DATA_REQUEST' = 'PATCH_USER_DATA_REQUEST';
export const PATCH_USER_DATA_SUCCESS: 'PATCH_USER_DATA_SUCCESS' = 'PATCH_USER_DATA_SUCCESS';
export const PATCH_USER_DATA_FAILED: 'PATCH_USER_DATA_FAILED' = 'PATCH_USER_DATA_FAILED';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESTORE_PASSWORD_REQUEST: 'RESTORE_PASSWORD_REQUEST' = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_SUCCESS: 'RESTORE_PASSWORD_SUCCESS' = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILED: 'RESTORE_PASSWORD_FAILED' = 'RESTORE_PASSWORD_FAILED';
export const RESTORE_PASSWORD_RESET: 'RESTORE_PASSWORD_RESET' = 'RESTORE_PASSWORD_RESET';

export const USER_RESET: 'USER_RESET' = 'USER_RESET';

export interface ILoginAction {
  readonly type: typeof LOG_IN_REQUEST;
}

export interface ILoginFailedAction {
  readonly type: typeof LOG_IN_FAILED;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOG_IN_SUCCESS;
}

export interface ILogoutAction {
  readonly type: typeof LOG_OUT_REQUEST;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOG_OUT_FAILED;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOG_OUT_SUCCESS;
}

export interface ISigninAction {
  readonly type: typeof SIGN_IN_REQUEST;
}

export interface ISignFailedAction {
  readonly type: typeof SIGN_IN_FAILED;
}

export interface ISignSuccessAction {
  readonly type: typeof SIGN_IN_SUCCESS;
}

export interface IRefreshTokenAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export interface IGetUserAction {
  readonly type: typeof GET_USER_DATA_REQUEST;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_DATA_FAILED;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly user: TUser;
}

export interface IPatchUserAction {
  readonly type: typeof PATCH_USER_DATA_REQUEST;
}

export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_DATA_FAILED;
}

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_DATA_SUCCESS;
  readonly user: TUser;
}

export interface IForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  readonly isForgotPassword: boolean;
}

export interface IRestorePasswordAction {
  readonly type: typeof RESTORE_PASSWORD_REQUEST;
}

export interface IRestorePasswordFailedAction {
  readonly type: typeof RESTORE_PASSWORD_FAILED;
}

export interface IRestorePasswordSuccessAction {
  readonly type: typeof RESTORE_PASSWORD_SUCCESS;
  readonly isResetPassword: boolean;
}

export interface IRestorePasswordResetFailedAction {
  readonly type: typeof RESTORE_PASSWORD_RESET;
}

export interface IUserReset {
  readonly type: typeof USER_RESET;
}

export type TUserActions =
  | ILoginAction
  | ILoginFailedAction
  | ILoginSuccessAction
  | ILogoutAction
  | ILogoutFailedAction
  | ILogoutSuccessAction
  | ISigninAction
  | ISignFailedAction
  | ISignSuccessAction
  | IRefreshTokenAction
  | IRefreshTokenFailedAction
  | IRefreshTokenSuccessAction
  | IGetUserAction
  | IGetUserFailedAction
  | IGetUserSuccessAction
  | IPatchUserAction
  | IPatchUserFailedAction
  | IPatchUserSuccessAction
  | IForgotPasswordAction
  | IForgotPasswordFailedAction
  | IForgotPasswordSuccessAction
  | IRestorePasswordAction
  | IRestorePasswordFailedAction
  | IRestorePasswordSuccessAction
  | IRestorePasswordResetFailedAction
  | IUserReset;

export function resetPassword(email: string) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    resetPasswordRequest(email)
      .then(getResponseData)
      .then(res => {
        localStorage.setItem('forgotPasswordSuccess', 'true');
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          isForgotPassword: res.success
        });
      })
      .catch(error => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        });
      })
  }
}

export function restorePassword(password: string, code: string) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: RESTORE_PASSWORD_REQUEST
    });
    restorePasswordRequest(password, code)
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: RESTORE_PASSWORD_SUCCESS,
          isResetPassword: res.success
        });
      })
      .catch(error => {
        dispatch({
          type: RESTORE_PASSWORD_FAILED
        });
      })
  }
}

export function registrate(email: string, password: string, name: string, cb: Function) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: SIGN_IN_REQUEST
    });
    registrateRequest(email, password, name)
      .then(getResponseData)
      .then(res => {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }
        dispatch({
          type: SIGN_IN_SUCCESS,
        });
        setCookie("accessToken", authToken, LIFE_OF_COOKIE_IN_MINUTES);
        localStorage.setItem('refreshToken', res.refreshToken);
        cb();
      })
      .catch(error => {
        dispatch({
          type: SIGN_IN_FAILED,
          message: error.message,
        });
      })
  }
}

export function logIn(email: string, password: string, cb: Function) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: LOG_IN_REQUEST
    });
    logInRequest(email, password)
      .then(getResponseData)
      .then(res => {
        let authToken;
        if (res.accessToken.indexOf('Bearer') === 0) {
          authToken = res.accessToken.split('Bearer ')[1];
        }
        dispatch({
          type: LOG_IN_SUCCESS,
        });
        setCookie("accessToken", authToken, LIFE_OF_COOKIE_IN_MINUTES);
        localStorage.setItem('refreshToken', res.refreshToken);
        cb();
      })
      .catch(error => {
        dispatch({
          type: LOG_IN_FAILED,
          message: error.message
        });
      });
  }
}

export function logOut() {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: LOG_OUT_REQUEST
    });
    logOutRequest()
      .then(getResponseData)
      .then(res => {
        deleteCookie("accessToken");
        localStorage.removeItem('refreshToken');
        dispatch({
          type: LOG_OUT_SUCCESS,
        });
        dispatch({
          type: CLEAR_SELECTED_INGREDIENTS,
        })
      })
      .catch(error => {
        dispatch({
          type: LOG_OUT_FAILED
        });
      })
  }
}

export function getUserData() {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_DATA_REQUEST
    });
    getUserDataRequest()
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          user: res.user
        });
      })
      .catch(error => {
        if (error.message === "jwt malformed") {
          dispatch(refreshToken(getUserData()))
        } else {
          dispatch({
            type: GET_USER_DATA_FAILED,
            message: error.message,
          });
        }
      })
  }
}

export function patchUserData(payload: TPayloadUser) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: PATCH_USER_DATA_REQUEST
    });
    patchUserDataRequest(payload)
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: PATCH_USER_DATA_SUCCESS,
          user: res.user
        });
      })
      .catch(error => {
        if (error.message === "jwt malformed") {
          dispatch(refreshToken(getUserData()))
        } else {
          dispatch({
            type: PATCH_USER_DATA_FAILED,
            message: error.message,
          });
        }
      })
  }
}

export function refreshToken(afterRefresh: Function) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    });
    refreshTokenRequest()
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
        setCookie('accessToken', authToken, LIFE_OF_COOKIE_IN_MINUTES);
        dispatch(afterRefresh);
      })
      .catch(error => {
        dispatch({
          type: REFRESH_TOKEN_FAILED
        });
      })
  }
}