import { getResponseData } from "../../utils/get-response-data";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const API_SOURCE_DATA = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    return fetch(API_SOURCE_DATA)
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      })
  }
}