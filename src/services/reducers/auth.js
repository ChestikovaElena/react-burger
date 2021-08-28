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
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
  PATCH_USER_DATA_REQUEST,
  PATCH_USER_DATA_SUCCESS,
  PATCH_USER_DATA_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED,
  RESTORE_PASSWORD_RESET,
  AUTH_RESET
} from "../actions/auth";

const initialState = {
  user: {name: '', email: ''},
  userDataRequest: false,
  userDataFailed: false,
  isLoggedIn: false,
  logInRequest: false,
  logInFailed: false,
  logOutRequest: false,
  logOutFailed: false,
  registrateRequest: false,
  registrateFailed: false,
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  isForgotPassword: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
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
        isLoggedIn: true,
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
        isLoggedIn: false,
        logOutRequest: false,
        logOutFailed: false,
        user: {name: '', email: ''}
      }
    }
    case LOG_OUT_FAILED: {
      return {
        ...state,
        logOutFailed: true
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
        isLoggedIn: true,
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
    case GET_USER_DATA_REQUEST:
    case PATCH_USER_DATA_REQUEST: {
      return {
        ...state,
        userDataRequest: true
      }
    }
    case GET_USER_DATA_SUCCESS:
    case PATCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        userDataRequest: false,
        userDataFailed: false
      }
    }
    case GET_USER_DATA_FAILED:
    case PATCH_USER_DATA_FAILED: {
      return {
        ...state,
        userDataFailed: true
      }
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isForgotPassword: action.isForgotPassword,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true
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
    case RESTORE_PASSWORD_RESET: {
      return {
        ...state,
        isForgotPassword: false,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false,
        isResetPassword: false,
        resetPasswordRequest: false,
        resetPasswordFailed: false
      }
    }
    case AUTH_RESET: {
      return {
        ...state,
        initialState
      }
    }
    default:
      return state;
  }
}