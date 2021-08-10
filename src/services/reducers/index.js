import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions';

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,

  ingredientData: {},

  selectedIngredients: [],

  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const rootReducer = (state = initialState, action) => {
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
    case ADD_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientData: [...state.data].filter(item => item._id === action.id)&&
          [...state.data].filter(item => item._id === action.id)[0]
      }
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientData: {}
      }
    }
    case ADD_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, ...state.ingredients.filter(item => item.id === action.id)]
      }
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients.filter(item => item.id !== action.id)]
      }
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        orderRequest: false,
        orderFailed: false
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true
      }
    }
    default:
      return state
  }
}