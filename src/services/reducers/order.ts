import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET
} from '../actions/order';
import { TOrderFull } from '../types/data';
import { TOrderActions } from '../actions/order';

export type TOrderState = {
  order: TOrderFull | {},
  orderRequest: boolean,
  orderFailed: boolean,
}

const initialState: TOrderState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
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
    case ORDER_RESET: {
      return {
        ...state,
        order: {},
        orderRequest: false,
        orderFailed: false
      }
    }
    default:
      return state;
  }
}