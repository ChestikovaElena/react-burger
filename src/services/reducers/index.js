import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_COUNT_BUN,
  INCREASE_COUNT_FILLER,
  DECREASE_COUNT,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  REORDER_SELECTED_INGREDIENTS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_DATA
} from '../actions';

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,

  ingredientData: {},

  dataSelected: [],

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
    case INCREASE_COUNT_BUN: {
      return {
        ...state,
        data: [...state.data]
          .map(item => item.type==='bun' ?
            item._id === action.id ?
              {...item, count: 1}
              :
              {...item, count: 0}
            :
            item)
      }
    }
    case INCREASE_COUNT_FILLER: {
      return {
        ...state,
        data: [...state.data]
        .map( item => item._id === action.id ?
          {...item, count: ++item.count}
          :
          item
        )
      }
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        data: [...state.data].map(item => 
          item._id === action.id ? {...item, count: --item.count} : item
        )
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
        dataSelected: 
          [...state.data].filter(item => item._id === action.id)[0].type !== 'bun' ?
            [...state.dataSelected,
              {...state.data.filter(item => item._id === action.id)[0], customID: action.customID}
            ]
            :
            [...state.dataSelected.filter(item => item.type !== 'bun'),
              {...state.data.filter(item => item._id === action.id)[0], customID: action.customID}
            ]
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
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
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
    case CLEAR_DATA: {
      return {
        ...state,
        dataSelected: []
      }
    }
    default:
      return state
  }
}