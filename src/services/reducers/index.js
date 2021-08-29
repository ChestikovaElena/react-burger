import { combineReducers } from 'redux';
import { dataReducer } from './data-ingredients';
import { dataSelectedReducer } from './data-selected';
import { ingredientReducer } from './ingredient-details';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  data: dataReducer,
  dataSelected: dataSelectedReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer
});