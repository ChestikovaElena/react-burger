import { getResponseData } from "../../utils/getResponseData";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const API_SOURCE_ORDER = 'https://norma.nomoreparties.space/api/orders';

export function getOrderInformation(arrayOfID) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    return fetch(API_SOURCE_ORDER, {
      method: 'POST',
      body: JSON.stringify({"ingredients": arrayOfID}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(getResponseData)
      .then(res => {console.log(res);
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order
        });
      })
      .catch(error => {console.log(error);
        dispatch({
          type: GET_ORDER_FAILED
        });
      })
  }
}