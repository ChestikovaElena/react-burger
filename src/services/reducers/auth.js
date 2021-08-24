import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED
} from "../actions/auth";

const initialState = {
  logInRequest: false,
  logInFailed: false,
  logOutRequest: false,
  logOutFailed: false,
  registrateRequest: false,
  registrateFailed: false,
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  isResetPassword: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  isResetPassword: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        logInRequest: true
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        logInRequest: false,
        logInFailed: false
      }
    }
    case LOG_IN_FAILED: {
      return {
        ...state,
        LogInFailed: true
      }
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logOutRequest: true
      }
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        logOutRequest: false,
        logOutFailed: false
      }
    }
    case LOG_OUT_FAILED: {
      return {
        ...state,
        LogOutFailed: true
      }
    }
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        registrateRequest: true
      }
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        registrateRequest: false,
        registrateFailed: false
      }
    }
    case SIGN_IN_FAILED: {
      return {
        ...state,
        registrateFailed: true
      }
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        logInRequest: true
      }
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        logInRequest: false,
        logInFailed: false
      }
    }
    case LOG_IN_FAILED: {
      return {
        ...state,
        LogInFailed: true
      }
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true
      }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: false
      }
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenFailed: true
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResetPassword: action.isResetPassword,
        resetPasswordRequest: false,
        resetPasswordFailed: false
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true
      }
    }
    case RESTORE_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      }
    }
    case RESTORE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResetPassword: action.isResetPassword,
        resetPasswordRequest: false,
        resetPasswordFailed: false
      }
    }
    case RESTORE_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true
      }
    }
    default:
      return state;
  }
}