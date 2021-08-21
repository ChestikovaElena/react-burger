import {
  LOG_IN,
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
  // isLoggingIn: false,
  token: '',
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
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        registrateRequest: true
      }
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        token: action.token,
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