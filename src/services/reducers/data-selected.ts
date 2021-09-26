import {
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  REORDER_SELECTED_INGREDIENTS,
  CLEAR_SELECTED_INGREDIENTS
} from '../actions/data-selected';
import { TIngredientSelected } from '../types/data';
import { TDataSelectedActions } from '../actions/data-selected';

export type TDataSelectedState = {
  dataSelected: Array<TIngredientSelected>
}

const initialState: TDataSelectedState = {
  dataSelected: [],
};

export const dataSelectedReducer = (state = initialState, action: TDataSelectedActions) => {
  switch (action.type) {
    case ADD_SELECTED_INGREDIENT: {
      return {
        ...state,
        dataSelected: [...action.newDataSelected]
      }
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {
        ...state,
        dataSelected: [...state.dataSelected.filter(item => item.customID !== action.customID)]
      }
    }
    case REORDER_SELECTED_INGREDIENTS: {
      const newSelectedData = [...state.dataSelected];
      newSelectedData.splice(action.hoverIndex, 0, newSelectedData.splice(action.dragIndex, 1)[0]);
      return {
        ...state,
        dataSelected: newSelectedData
      }
    }
    case CLEAR_SELECTED_INGREDIENTS: {
      return {
        ...state,
        dataSelected: []
      }
    }
    default:
      return state
  }
}