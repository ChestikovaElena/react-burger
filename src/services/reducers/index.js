import { combineReducers } from 'redux';
import { dataReducer } from './data';
import { selectedIngredientReducer } from './selected-ingredient';
import { ingredientDetailsReducer } from './ingredient-details';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  data: dataReducer,
  selectedingredients: selectedIngredientReducer,
  currentIngredient: ingredientDetailsReducer,
  order: orderReducer
});