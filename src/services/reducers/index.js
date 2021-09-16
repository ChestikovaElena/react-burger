import { combineReducers } from 'redux';
import { dataReducer } from './data-ingredients';
import { dataSelectedReducer } from './data-selected';
import { orderReducer } from './order';
import { orderInfoReducer } from './order-info';
import { userReducer } from './user';
import { wsReducer } from './ws';
import { wsUserReducer } from './ws-user';

export const rootReducer = combineReducers({
  data: dataReducer,
  dataSelected: dataSelectedReducer,
  order: orderReducer,
  orderInfo: orderInfoReducer,
  user: userReducer,
  ws: wsReducer,
  wsUser: wsUserReducer
});