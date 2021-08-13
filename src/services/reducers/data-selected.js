import {
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  REORDER_SELECTED_INGREDIENTS,
  CLEAR_SELECTED_INGREDIENTS
} from '../actions/data-selected';

const initialState = {
  dataSelected: [],
};

export const dataSelectedReducer = (state = initialState, action) => {
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
      return {
        ...state,
        dataSelected: action.payload
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