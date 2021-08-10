export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';

export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

const API_SOURCE = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(API_SOURCE)
      .then(res => {
        if (res.ok) {
          return res.json();
        } return Promise.reject(`Ошибка ${res.status}`)
      })
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