import { AnyAction, Middleware } from 'redux';

import { getCookie } from '../../utils/cookie';
import { RootStore } from '../types';
import { wsActions, wsUserActions } from '../store';
import { AppDispatch, AppThunk } from '../types';

type TActions = typeof wsActions | typeof wsUserActions;
//: Middleware<{}, RootStore> =
export const socketMiddleware =
  (wsUrl: string, wsActions: TActions, isUserWebSocket: boolean): any => {
  return (store: { dispatch: AppDispatch | AppThunk }) => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onMessage, onClose, onError } = wsActions;
      const token = getCookie('accessToken');

      if (isUserWebSocket) {
        if (type === wsInit && token) {
          socket = new WebSocket(`${wsUrl}?token=${token}`);
        }
      } else {
        if (type === wsInit) {
          socket = new WebSocket(`${wsUrl}`);
        }
      }
      
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};