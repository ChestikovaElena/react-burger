export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
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
        console.log(res);
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