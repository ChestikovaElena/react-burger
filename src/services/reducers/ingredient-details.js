import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS
} from '../actions';

const initialState = {
  currentIngredient: {}
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        currentIngredient: state.ingredients.filter(item => item.id === action.id)
      }
    }
    default:
      return state
  }
}