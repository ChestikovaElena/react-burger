import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TIngredientsAction } from '../actions/data-ingredients';
import { TDataSelectedActions } from '../actions/data-selected';
import { TWsActions, TWsUserActions } from '../actions/ws';
import { TOrderInfo } from '../actions/order-info';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';

type TApplicationActions =
  | TIngredientsAction
  | TDataSelectedActions
  | TWsActions
  | TWsUserActions
  | TOrderInfo
  | TOrderActions
  | TUserActions;

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootStore, TApplicationActions>
>;