import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
  WS_USER_CONNECTION_FAILED,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_UPDATE_ORDER,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/ws.js';

const initialState = {
  wsConnected: false,
  wsConnectionRequest: false,
  wsConnectionFailed: false,
  orders: [],
  total: null,
  totalToday: null,
  orderRequest: false,
  orderFailed: false,
}

export const wsUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_CONNECTION_START:
      return {
        ...state,
        wsConnectionRequest: true
      };
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnectionRequest: false,
        wsConnected: true
      };
    case WS_USER_CONNECTION_FAILED:
      return {
        ...state,
        wsConnected: false,
        wsConnectionRequest: false,
        wsConnectionFailed: true
      };
    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    case WS_USER_UPDATE_ORDER:
      return {
        ...state,
          orders:
            [
              ...state.orders.filter(item => item._id !== action.updateOrder._id),
              action.updateOrder
            ]
      }
      case GET_ORDER_REQUEST: {
        return {
          ...state,
          orderRequest: true
        }
      }
      case GET_ORDER_SUCCESS: {
        return {
          ...state,
          orders: action.orders,
          orderRequest: false,
          orderFailed: false
        }
      }
      case GET_ORDER_FAILED: {
        return {
          ...state,
          orderFailed: true
        }
      }
    default:
      return state
  }
};
