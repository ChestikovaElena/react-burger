import {
  LOG_IN,
  LOG_OUT,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from "../actions/auth";

const initialState = {
  isLoggingIn: false,
  token: '',
  isResetingPassword: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResetingPassword: action.isResetingPassword,
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
    default:
      return state;
  }
}