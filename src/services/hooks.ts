import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, RootStore, AppThunk } from './types';

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useSelector: TypedUseSelectorHook<RootStore> = selectorHook;