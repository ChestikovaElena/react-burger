import { TOrder } from '../types/data';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_FAILED: 'WS_CONNECTION_FAILED' = 'WS_CONNECTION_FAILED';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_UPDATE_ORDER: 'WS_UPDATE_ORDER' = 'WS_UPDATE_ORDER';

export const WS_USER_CONNECTION_START: 'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS: 'WS_USER_CONNECTION_SUCCESS' = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_FAILED: 'WS_USER_CONNECTION_FAILED' = 'WS_USER_CONNECTION_FAILED';
export const WS_USER_CONNECTION_CLOSED: 'WS_USER_CONNECTION_CLOSED' = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE: 'WS_USER_GET_MESSAGE' = 'WS_USER_GET_MESSAGE';
export const WS_USER_UPDATE_ORDER: 'WS_USER_UPDATE_ORDER' = 'WS_USER_UPDATE_ORDER';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly wsConnectionRequest: boolean;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly wsConnected: boolean;
}

export interface IWsConnectionFailed {
  readonly type: typeof WS_CONNECTION_FAILED;
  readonly wsConnected: boolean;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly wsConnected: boolean;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: { total: number, totalToday: number, orders: TOrder[] };
}

export interface IWsUpdateOrder {
  readonly type: typeof WS_UPDATE_ORDER;
  readonly updateOrder: TOrder;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionFailed
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsUpdateOrder
  | IDefault;

  export interface IWsUserConnectionStart {
    readonly type: typeof WS_USER_CONNECTION_START;
    readonly wsConnectionRequest: boolean;
  }
  
  export interface IWsUserConnectionSuccess {
    readonly type: typeof WS_USER_CONNECTION_SUCCESS;
    readonly wsConnected: boolean;
  }
  
  export interface IWsUserConnectionFailed {
    readonly type: typeof WS_USER_CONNECTION_FAILED;
    readonly wsConnected: boolean;
  }
  
  export interface IWsUserConnectionClosed {
    readonly type: typeof WS_USER_CONNECTION_CLOSED;
    readonly wsConnected: boolean;
  }
  
  export interface IWsUserGetMessage {
    readonly type: typeof WS_USER_GET_MESSAGE;
    readonly payload: { total: number, totalToday: number, orders: TOrder[] };
  }

  export interface IWsUserUpdateOrder {
    readonly type: typeof WS_USER_UPDATE_ORDER;
    readonly updateOrder: TOrder;
  }

  export interface IDefault {
    readonly type: typeof undefined;
  }

  export type TWsUserActions =
    | IWsUserConnectionStart
    | IWsUserConnectionSuccess
    | IWsUserConnectionFailed
    | IWsUserConnectionClosed
    | IWsUserGetMessage
    | IWsUserUpdateOrder
    | IDefault;