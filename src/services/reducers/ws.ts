import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_UPDATE_ORDER
} from '../actions/ws';
import { TOrder, TOrderUpdated } from '../types/data';
import { TWsUserState } from './ws-user';
import { TWsActions } from '../actions/ws';

const initialState: TWsUserState = {
  wsConnected: false,
  wsConnectionRequest: false,
  wsConnectionFailed: false,
  orders: [],
  total: null,
  totalToday: null
}

export const wsReducer = (state = initialState, action: TWsActions) => {
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
      let newOrders: TOrder[] = state.orders;console.log(newOrders);
      if (state.orders && state.orders.length) {
        const indexAfterNewOrders: number = action.payload.orders.findIndex(order => order._id === state.orders[0]._id);
        if (indexAfterNewOrders === 0 || !indexAfterNewOrders) {
          newOrders = action.payload.orders;
        } else {
          newOrders.unshift(...action.payload.orders.slice(0, indexAfterNewOrders));console.log(newOrders);
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
    case WS_UPDATE_ORDER:
      return {
        ...state,
        orders:
          [
            ...(state.orders as TOrderUpdated[]).filter(
              (item: TOrderUpdated) => item._id !== action.updateOrder._id),
            action.updateOrder
          ]
      };
    default:
      return state
  }
};
