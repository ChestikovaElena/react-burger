export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_COUNT_BUN = 'INCREASE_COUNT_BUN';
export const INCREASE_COUNT_FILLER = 'INCREASE_COUNT_FILLER';
export const DECREASE_COUNT = 'DECREASE_COUNT';

export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';

export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';
export const REORDER_SELECTED_INGREDIENTS = 'REORDER_SELECTED_INGREDIENTS';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const CLEAR_DATA = 'CLEAR_DATA';

const API_SOURCE_DATA = 'https://norma.nomoreparties.space/api/ingredients';
const API_SOURCE_ORDER = 'https://norma.nomoreparties.space/api/orders';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(API_SOURCE_DATA)
      .then(res => {
        if (res.ok) {
          return res.json();
        } return Promise.reject(`Ошибка ${res.status}`)
      })
      .then(res => {
        let resWithCount = res.data.map(item => {
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

export function getOrderInformation(arrayOfID) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    fetch(API_SOURCE_ORDER, {
      method: 'POST',
      body: JSON.stringify({"ingredients": arrayOfID}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } return Promise.reject(`Ошибка ${res.status}`)
      })
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