import { getResponseData } from "../../utils/get-response-data";
import { AppDispatch } from "../types";
import { TOrder, TOrderUpdated } from "../types/data";

export const GET_ORDER_INFO_REQUEST: 'GET_ORDER_INFO_REQUEST' = 'GET_ORDER_INFO_REQUEST';
export const GET_ORDER_INFO_SUCCESS: 'GET_ORDER_INFO_SUCCESS' = 'GET_ORDER_INFO_SUCCESS';
export const GET_ORDER_INFO_FAILED: 'GET_ORDER_INFO_FAILED' = 'GET_ORDER_INFO_FAILED';
export const UPDATE_ORDER_INFO: 'UPDATE_ORDER_INFO' = 'UPDATE_ORDER_INFO';

export interface IGetOrderInfoRequest {
  readonly type: typeof GET_ORDER_INFO_REQUEST;
}

export interface IGetOrderInfoSuccess {
  readonly type: typeof GET_ORDER_INFO_SUCCESS;
  readonly orders: TOrder[];
}

export interface IGetOrderInfoFailed {
  readonly type: typeof GET_ORDER_INFO_FAILED;
}

export interface IUpdateOrderInfo {
  readonly type: typeof UPDATE_ORDER_INFO;
  readonly updateOrder: TOrderUpdated;
}

export interface IDefault {
  readonly type: typeof undefined;
}

export type TOrderInfo = 
  | IGetOrderInfoRequest
  | IGetOrderInfoSuccess
  | IGetOrderInfoFailed
  | IUpdateOrderInfo
  | IDefault;

const API_SOURCE_DATA = 'https://norma.nomoreparties.space/api/orders/';

export function getOrderInfoRequest(number: string) {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_INFO_REQUEST
    })
    return fetch(`${API_SOURCE_DATA}${number}`)
      .then(getResponseData)
      .then(res => {
        dispatch({
          type: GET_ORDER_INFO_SUCCESS,
          orders: res.orders
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_INFO_FAILED
        });
      })
  }
}