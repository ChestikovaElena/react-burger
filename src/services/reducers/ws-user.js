import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
  WS_USER_CONNECTION_FAILED,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_UPDATE_ORDER
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
      let newOrders;
      if (state.orders && state.orders.length) {
        const indexAfterNewOrders = action.payload.orders.findIndex(order => order._id === state.orders[0]._id);
        if (indexAfterNewOrders === 0 || !indexAfterNewOrders) {
          newOrders = action.payload.orders;
        } else {
          newOrders = state.orders.unshift(action.payload.orders.slice(0, indexAfterNewOrders));
        }
      } else {
        newOrders = action.payload.orders;
      }
      
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
    default:
      return state
  }
};
