import { getResponseData } from "../../utils/get-response-data";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_FAILED = 'WS_CONNECTION_FAILED';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_UPDATE_ORDER = 'WS_UPDATE_ORDER';

export const WS_USER_CONNECTION_START = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_FAILED = 'WS_USER_CONNECTION_FAILED';
export const WS_USER_CONNECTION_CLOSED = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE = 'WS_USER_GET_MESSAGE';
export const WS_USER_UPDATE_ORDER = 'WS_USER_UPDATE_ORDER';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const API_SOURCE_DATA = 'norma.nomoreparties.space/api/orders/';

export function getOrderInfoRequest(id) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    return fetch(`${API_SOURCE_DATA}id`)
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orders: res.orders
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_FAILED
        });
      })
  }
}