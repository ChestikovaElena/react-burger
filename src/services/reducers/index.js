import { combineReducers } from 'redux';
import { dataReducer } from './data-ingredients';
import { dataSelectedReducer } from './data-selected';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  data: dataReducer,
  dataSelected: dataSelectedReducer,
  order: orderReducer,
  user: userReducer
});