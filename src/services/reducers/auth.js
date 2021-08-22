import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_OUT,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED
} from "../actions/auth";

const initialState = {
  accessToken: '',
  logInRequest: false,
  logInFailed: false,
  registrateRequest: false,
  registrateFailed: false,
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
        accessToken: action.accessToken,
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
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        registrateRequest: true
      }
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        accessToken: action.accessToken,
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