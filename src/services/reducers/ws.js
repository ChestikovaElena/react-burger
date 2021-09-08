import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_CLOSE,
  WS_USER_NAME_UPDATE
} from '../actions/ws.js';

const initialState = {
  wsConnected: false,
  messages: []
}

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: state.messages.length
          ? [...state.messages, { ...action.payload, timestamp: Date().getTime() / 1000 }]
          : [{ ...action.payload, timestamp: Date().getTime() / 1000 }]
      };
    case WS_USER_NAME_UPDATE:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state
  }
};