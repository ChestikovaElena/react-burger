import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
  WS_USER_CONNECTION_FAILED,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_UPDATE_ORDER
} from '../actions/ws';
import { TOrder } from '../types/data';
import { TWsUserActions } from '../actions/ws';

export type TWsUserState = {
  wsConnected: boolean,
  wsConnectionRequest: boolean,
  wsConnectionFailed: boolean,
  orders: TOrder[],
  total: number | null,
  totalToday: number | null
}

const initialState: TWsUserState = {
  wsConnected: false,
  wsConnectionRequest: false,
  wsConnectionFailed: false,
  orders: [],
  total: null,
  totalToday: null
}

export const wsUserReducer = (state = initialState, action: TWsUserActions) => {
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
      let newOrders: TOrder[] = state.orders;
      if (state.orders && state.orders.length) {
        const indexAfterNewOrders: number =
          (action.payload.orders as TOrder[]).findIndex(order => order._id === state.orders[0]._id);
        if (indexAfterNewOrders === 0 || !indexAfterNewOrders) {
          newOrders = action.payload.orders;
        } else {
          newOrders.unshift(...action.payload.orders.slice(0, indexAfterNewOrders));
        }
      } else {
        newOrders = action.payload.orders;
      }
      
      return {
        ...state,
        orders: newOrders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    case WS_USER_UPDATE_ORDER:
      return {
        ...state,
          orders:
            [
              ...(state.orders as TOrder[]).filter(
                (item: TOrder) => item._id !== action.updateOrder._id
              ),
              action.updateOrder
            ]
      }
    default:
      return state
  }
};
