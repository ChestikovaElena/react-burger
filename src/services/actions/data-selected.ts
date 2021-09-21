import { TIngredientSelected } from '../types/data';

export const ADD_SELECTED_INGREDIENT: 'ADD_SELECTED_INGREDIENT' = 'ADD_SELECTED_INGREDIENT';
export const DELETE_SELECTED_INGREDIENT: 'DELETE_SELECTED_INGREDIENT' = 'DELETE_SELECTED_INGREDIENT';
export const REORDER_SELECTED_INGREDIENTS: 'REORDER_SELECTED_INGREDIENTS' = 'REORDER_SELECTED_INGREDIENTS';

export const CLEAR_SELECTED_INGREDIENTS: 'CLEAR_SELECTED_INGREDIENTS' = 'CLEAR_SELECTED_INGREDIENTS';

export interface IAddSelectedIngredient {
  readonly type: typeof ADD_SELECTED_INGREDIENT;
  readonly newSataSelected: ReadonlyArray<TIngredientSelected>;
}

export interface IDeleteSelectedIngredient {
  readonly type: typeof DELETE_SELECTED_INGREDIENT;
  readonly customID: string;
}

export interface IReorderSelectedIngredient {
  readonly type: typeof REORDER_SELECTED_INGREDIENTS;
  readonly newSelectedData: ReadonlyArray<TIngredientSelected>;
}

export interface IClearSelectedIngredient {
  readonly type: typeof CLEAR_SELECTED_INGREDIENTS;
  readonly dataSelected: [];
}

export type TDataSelectedActions = 
  | IAddSelectedIngredient
  | IDeleteSelectedIngredient
  | IReorderSelectedIngredient
  | IClearSelectedIngredient;