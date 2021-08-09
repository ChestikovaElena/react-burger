import {
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT
} from '../actions';

const initialState = {
  selectedIngredients: []
}

export const selectedIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, ...state.ingredients.filter(item => item.id === action.id)]
      }
    }
    default:
      return state
  }
}