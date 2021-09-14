import { getResponseData } from "../../utils/get-response-data";

export const GET_ORDER_INFO_REQUEST = 'GET_ORDER_INFO_REQUEST';
export const GET_ORDER_INFO_SUCCESS = 'GET_ORDER_INFO_SUCCESS';
export const GET_ORDER_INFO_FAILED = 'GET_ORDER_INFO_FAILED';
export const UPDATE_ORDER_INFO = 'UPDATE_ORDER_INFO';

const API_SOURCE_DATA = 'https://norma.nomoreparties.space/api/orders/';

export function getOrderInfoRequest(number) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_INFO_REQUEST
    })
    return fetch(`${API_SOURCE_DATA}${number}`)
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: GET_ORDER_INFO_SUCCESS,
          orders: res.orders
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_INFO_FAILED
        });
      })
  }
}