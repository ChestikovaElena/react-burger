import {
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
  UPDATE_ORDER_INFO
}  from '../actions/order-info';
import { TOrderInfo } from '../actions/order-info';
import { TOrder, TOrderUpdated } from '../types/data';

export type TOrderInfoState = {
  orderRequest: boolean,
  orderRequestSuccess: boolean,
  orderRequestFailed: boolean,
  orderInfo: Array<TOrder> | Array<TOrderUpdated>
}

const initialState: TOrderInfoState = {
  orderRequest: false,
  orderRequestSuccess: false,
  orderRequestFailed: false,
  orderInfo: []
}

export const orderInfoReducer = (state = initialState, action: TOrderInfo) => {
  switch (action.type) {
    case GET_ORDER_INFO_REQUEST:
      return {
        ...state,
        orderRequest: true
      };
    case GET_ORDER_INFO_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderRequestSuccess: true,
        orderInfo: action.orders
      };
    case GET_ORDER_INFO_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      };
    case UPDATE_ORDER_INFO:
      return {
        ...state,
        orderInfo: [action.updateOrder]
      };
    default:
      return state
  }
}