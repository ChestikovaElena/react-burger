import {
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
} from '../actions/ingredient-details';

const initialState = {
  ingredientData: {},
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientData: action.ingredientData
      }
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientData: {}
      }
    }
    default:
      return state
  }
}