import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSE,
  WS_USER_NAME_UPDATE,
  WS_UPDATE_ORDER
} from '../actions/ws.js';

const initialState = {
  wsConnected: false,
  wsConnectionRequest: false,
  wsConnectionFailed: false,
  orders: [],
  total: null,
  totalToday: null
}

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnectionRequest: true
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnectionRequest: false,
        wsConnected: true
      };
    case WS_CONNECTION_FAILED:
      return {
        ...state,
        wsConnected: false,
        wsConnectionRequest: false,
        wsConnectionFailed: true
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    case WS_USER_NAME_UPDATE:
      return {
        ...state,
        user: action.payload
      };
    case WS_UPDATE_ORDER:
      return {
        ...state,
          orders:
            [
              ...state.orders.filter(item => item._id !== action.updateOrder._id),
              action.updateOrder
            ]
      };
    default:
      return state
  }
};
