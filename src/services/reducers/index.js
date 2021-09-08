import { combineReducers } from 'redux';
import { dataReducer } from './data-ingredients';
import { dataSelectedReducer } from './data-selected';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
  data: dataReducer,
  dataSelected: dataSelectedReducer,
  order: orderReducer,
  user: userReducer,
  ws: wsReducer
});