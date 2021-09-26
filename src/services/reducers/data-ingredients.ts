import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/data-ingredients';
import { TIngredient } from '../types/data';
import { TIngredientsAction } from '../actions/data-ingredients';

export type TDataIngredientsState = {
  data: Array<TIngredient>;
  dataRequest: boolean;
  dataFailed: boolean;
}

const initialState: TDataIngredientsState = {
  data: [],
  dataRequest: false,
  dataFailed: false
}

export const dataReducer = (state = initialState, action: TIngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        dataRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        dataRequest: false,
        dataFailed: false
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        dataFailed: true
      }
    }
    default:
      return state
  }
}