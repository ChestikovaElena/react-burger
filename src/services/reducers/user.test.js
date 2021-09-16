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
  USER_RESET
} from "../actions/user";
import { userReducer } from './user';

const initialState = {
  user: {name: '', email: ''},
  userDataRequest: false,
  userDataFailed: false,
  userDataFailedMessage: '',
  isLoggedIn: false,
  logInRequest: false,
  logInFailed: false,
  logInFailedMessage: '',
  logOutRequest: false,
  logOutFailed: false,
  registrateRequest: false,
  registrateFailed: false,
  registrateFailedMessage: '',
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  isForgotPassword: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  isResetPassword: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(
      userReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should set userDataRequest (GET_USER_DATA_REQUEST)", () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_DATA_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        userDataRequest: true
      }
    );
  });

  it("should set user data (GET_USER_DATA_SUCCESS)", () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_DATA_SUCCESS,
        user: {name: 'Ivan', email: 'ivan@ivan.ru'}
      })
    ).toEqual(
      {
        ...initialState,
        isLoggedIn: true,
        user: {name: 'Ivan', email: 'ivan@ivan.ru'}
      }
    );
  });

  it("should set userFailed (GET_USER_DATA_FAILED)", () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_DATA_FAILED,
        message: "error"
      })
    ).toEqual(
      {
        ...initialState,
        userDataFailed: true,
        userDataFailedMessage: "error"
      }
    );
  });

  it("should set userDataRequest (PATCH_USER_DATA_REQUEST)", () => {
    expect(
      userReducer(initialState, {
        type: PATCH_USER_DATA_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        userDataRequest: true
      }
    );
  });

  it("should set user data (PATCH_USER_DATA_SUCCESS)", () => {
    expect(
      userReducer(
        {...initialState,
          user: {name: 'Vano', email: 'ivan@ivan.ru'}
        },
        {
          type: PATCH_USER_DATA_SUCCESS,
          user: {name: 'Ivan', email: 'ivan@ivan.ru'}
        })
    ).toEqual(
      {
        ...initialState,
        isLoggedIn: true,
        user: {name: 'Ivan', email: 'ivan@ivan.ru'}
      }
    );
  });

  it("should set userFailed (PATCH_USER_DATA_FAILED)", () => {
    expect(
      userReducer(initialState, {
        type: PATCH_USER_DATA_FAILED,
        message: "error"
      })
    ).toEqual(
      {
        ...initialState,
        userDataFailed: true,
        userDataFailedMessage: "error"
      }
    );
  });

  it("should set logInRequest (LOG_IN_REQUEST)", () => {
    expect(
      userReducer(initialState, {
        type: LOG_IN_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        logInRequest: true
      }
    );
  });

  it("should set isLoggedIn (LOG_IN_SUCCESS)", () => {
    expect(
      userReducer(initialState, {
        type: LOG_IN_SUCCESS
      })
    ).toEqual(
      {
        ...initialState,
        isLoggedIn: true,
      }
    );
  });

  it("should set logInFailed and logInFailedMessage (LOG_IN_FAILED)", () => {
    expect(
      userReducer(initialState, {
        type: LOG_IN_FAILED,
        message: "error"
      })
    ).toEqual(
      {
        ...initialState,
        logInFailed: true,
        logInFailedMessage: "error"
      }
    );
  });

  it("should set logOutRequest (LOG_OUT_REQUEST)", () => {
    expect(
      userReducer(initialState, {
        type: LOG_OUT_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        logOutRequest: true
      }
    );
  });

  it("should set isLoggedIn = true (LOG_OUT_SUCCESS)", () => {
    expect(
      userReducer(
        {
          ...initialState,
          user: {name: 'Ivan', email: 'ivan@ivan.ru'}
        },
        {
          type: LOG_OUT_SUCCESS
        })
    ).toEqual(
      {
        ...initialState,
        isLoggedIn: false
      }
    );
  });

  it("should set logOutFailed (LOG_OUT_FAILED)", () => {
    expect(
      userReducer(initialState, {
        type: LOG_OUT_FAILED
      })
    ).toEqual(
      {
        ...initialState,
        logOutFailed: true
      }
    );
  });

  it("should set registrateRequest (SIGN_IN_REQUEST)", () => {
    expect(
      userReducer(initialState, {
        type: SIGN_IN_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        registrateRequest: true
      }
    );
  });

  it("should set isLoggedIn = true (SIGN_IN_SUCCESS)", () => {
    expect(
      userReducer(initialState,
        {
          type: SIGN_IN_SUCCESS
        })
    ).toEqual(
      {
        ...initialState,
        isLoggedIn: true
      }
    );
  });

  it("should set logOutFailed (SIGN_IN_FAILED)", () => {
    expect(
      userReducer(initialState, {
        type: SIGN_IN_FAILED,
        message: "error"
      })
    ).toEqual(
      {
        ...initialState,
        registrateFailed: true,
        registrateFailedMessage: "error"
      }
    );
  });

  it("should set refreshTokenRequest (REFRESH_TOKEN_REQUEST)", () => {
    expect(
      userReducer(initialState, {
        type: REFRESH_TOKEN_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: true
      }
    );
  });

  it("should set refreshTokenRequest = false (REFRESH_TOKEN_SUCCESS)", () => {
    expect(
      userReducer(
        {
          ...initialState,
          refreshTokenRequest: true
        },
        {
          type: REFRESH_TOKEN_SUCCESS
        })
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: false
      }
    );
  });

  it("should set refreshTokenFailed (REFRESH_TOKEN_FAILED)", () => {
    expect(
      userReducer(
        {
          ...initialState,
          refreshTokenRequest: true,
        },
        {
          type: REFRESH_TOKEN_FAILED
        })
    ).toEqual(
      {
        ...initialState,
        refreshTokenFailed: true,
        refreshTokenRequest: false
      }
    );
  });

  it("should set forgotPasswordRequest (FORGOT_PASSWORD_REQUEST)", () => {
    expect(
      userReducer(initialState, {
        type: FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: true
      }
    );
  });

  it("should set isForgotPassword (FORGOT_PASSWORD_SUCCESS)", () => {
    expect(
      userReducer(
        {
          ...initialState,
          forgotPasswordRequest: true
        },
        {
          type: FORGOT_PASSWORD_SUCCESS,
          isForgotPassword: true
        })
    ).toEqual(
      {
        ...initialState,
        isForgotPassword: true,
        forgotPasswordRequest: false,
      }
    );
  });

  it("should set forgotPasswordFailed (FORGOT_PASSWORD_FAILED)", () => {
    expect(
      userReducer(
        {
          ...initialState,
          forgotPasswordRequest: true,
        },
        {
          type: FORGOT_PASSWORD_FAILED
        })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false
      }
    );
  });

  it("should set resetPasswordRequest (RESTORE_PASSWORD_REQUEST)", () => {
    expect(
      userReducer(initialState, {
        type: RESTORE_PASSWORD_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: true
      }
    );
  });

  it("should set isResetPassword (RESTORE_PASSWORD_SUCCESS)", () => {
    expect(
      userReducer(
        {
          ...initialState,
          resetPasswordRequest: true
        },
        {
          type: RESTORE_PASSWORD_SUCCESS,
          isResetPassword: true
        })
    ).toEqual(
      {
        ...initialState,
        isResetPassword: true,
        resetPasswordRequest: false,
        resetPasswordFailed: false
      }
    );
  });

  it("should set resetPasswordFailed (RESTORE_PASSWORD_FAILED)", () => {
    expect(
      userReducer(
        {
          ...initialState,
          resetPasswordRequest: true,
        },
        {
          type: RESTORE_PASSWORD_FAILED
        })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: false,
        resetPasswordFailed: true
      }
    );
  });

  it("should set isForgotPassword=false, isResetPassword=false (RESTORE_PASSWORD_RESET)", () => {
    expect(
      userReducer(
        {
          ...initialState,
          isResetPassword: true,
          resetPasswordRequest: false,
          resetPasswordFailed: false
        },
        {
          type: RESTORE_PASSWORD_RESET
        })
    ).toEqual({
      ...initialState,
      isForgotPassword: false,
      forgotPasswordRequest: false,
      forgotPasswordFailed: false,
      isResetPassword: false,
      resetPasswordRequest: false,
      resetPasswordFailed: false
    });
  });

  it("should set initialState (USER_RESET)", () => {
    expect(
      userReducer(initialState, {
        type: USER_RESET
      })
    ).toEqual(initialState);
  });
});
