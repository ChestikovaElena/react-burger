import { getResponseData } from "../../utils/get-response-data";
import { getCookie } from '../../utils/cookie';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const ORDER_RESET = 'ORDER_RESET';

const API_SOURCE_ORDER = 'https://norma.nomoreparties.space/api/orders';

export function getOrderInformation(arrayOfID) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    return fetch(API_SOURCE_ORDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ` + getCookie('accessToken')
      },
      body: JSON.stringify({"ingredients": arrayOfID})
    })
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_FAILED
        });
      })
  }
}
