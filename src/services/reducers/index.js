import { combineReducers } from 'redux';
import { dataReducer } from './data';
import { dataSelectedReducer } from './data-selected';
import { ingredientReducer } from './ingredient-details';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  data: dataReducer,
  dataSelected: dataSelectedReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
});