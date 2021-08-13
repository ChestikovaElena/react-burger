import { getResponseData } from "../../utils/getResponseData";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_COUNT_BUN = 'INCREASE_COUNT_BUN';
export const INCREASE_COUNT_FILLER = 'INCREASE_COUNT_FILLER';
export const DECREASE_COUNT = 'DECREASE_COUNT';

const API_SOURCE_DATA = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    return fetch(API_SOURCE_DATA)
      .then(getResponseData)
      .then(res => {
        const resWithCount = res.data.map(item => {
          let ingredient = Object.assign({}, item);
          ingredient.count = 0;
          return ingredient;
        });
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: resWithCount
        });
      })
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      })
  }
}