import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_COUNT_BUN,
  INCREASE_COUNT_FILLER,
  DECREASE_COUNT
} from '../actions/data';

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false
}

export const dataReducer = (state = initialState, action) => {
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
    default:
      return state
  }
}