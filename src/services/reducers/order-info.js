import {
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
  UPDATE_ORDER_INFO
}  from '../actions/order-info.js';

const initialState = {
  orderRequest: false,
  orderRequestSuccess: false,
  orderRequestFailed: false,
  orderInfo: []
}

export const orderInfoReducer = (state = initialState, action) => {
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
      console.log(action.updateOrder);
      return {
        ...state,
        orderInfo: [action.updateOrder]
      };
    default:
      return state
  }
}