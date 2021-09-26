import { getResponseData } from "../../utils/get-response-data";
import { TIngredient } from "../types/data";
import { AppDispatch, AppThunk } from '../types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const API_SOURCE_DATA = 'https://norma.nomoreparties.space/api/ingredients';

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: Array<TIngredient>;
}

export interface IDefault {
  readonly type: typeof undefined;
}

export type TIngredientsAction = 
  | IGetIngredientsRequest
  | IGetIngredientsFailed
  | IGetIngredientsSuccess
  | IDefault;

export const getIngredientsRequest = (): IGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsFailed = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED
});

export const getIngredientsSuccess = (
  data: Array<TIngredient>
): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  data
});

export const getIngredientsThunk: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());
  return fetch(API_SOURCE_DATA)
    .then(getResponseData)
    .then(res => {
      dispatch(getIngredientsSuccess(res.data));
    })
    .catch(error => {
      dispatch(getIngredientsFailed());
    });
}