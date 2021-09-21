import {
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
  UPDATE_ORDER_INFO
}  from '../actions/order-info.ts';
import { orderInfoReducer } from './order-info.js';

const initialState = {
  orderRequest: false,
  orderRequestSuccess: false,
  orderRequestFailed: false,
  orderInfo: []
}

describe('orderInfoReducer', () => {
  it("should return the initial state", () => {
    expect(
      orderInfoReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should set orderRequest (GET_ORDER_INFO_REQUEST)", () => {
    expect(
      orderInfoReducer( initialState, {
        type: GET_ORDER_INFO_REQUEST
      })
    ).toEqual(
      {
        ...initialState,
        orderRequest: true
      }
    );
  });

  it("should set orderInfo (GET_ORDER_INFO_SUCCESS)", () => {
    expect(
      orderInfoReducer(initialState, {
        type: GET_ORDER_INFO_SUCCESS,
        orders: [{ id: "1", name: "Заказ"}]
      })
    ).toEqual(
      {
        ...initialState,
        orderInfo: [{ id: "1", name: "Заказ" }],
        orderRequestSuccess: true
      }
    );
  });

  it("should set orderRequestFailed (GET_ORDER_INFO_FAILED)", () => {
    expect(
      orderInfoReducer(initialState, {
        type: GET_ORDER_INFO_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        orderFailed: true
      }
    );
  });

  it("should change orderInfo (UPDATE_ORDER_INFO)", () => {
    expect(
      orderInfoReducer(
        {
          ...initialState,
          orderInfo: [{ id: "1", name: "Заказ" }]
        }, {
        type: UPDATE_ORDER_INFO,
        updateOrder: { id: "1", name: "Заказ", isUpdatingOrder: true }
      })
    ).toEqual(
      {
        ...initialState,
        orderInfo: [{ id: "1", name: "Заказ", isUpdatingOrder: true }],
      }
    )
  })
})