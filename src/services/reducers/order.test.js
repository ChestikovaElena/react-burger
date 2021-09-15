import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET
} from '../actions/order';
import { orderReducer } from './order';

const initialState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
};

describe("orderReducer", () => {
  it("should return the initial state", () => {
    expect(
      orderReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should set orderRequest (GET_ORDEER_REQUEST)", () => {
    expect(
      orderReducer(initialState, {
        type: GET_ORDER_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        orderRequest: true
      }
    );
  });

  it("should set order data (GET_ORDER_SUCCESS)", () => {
    expect(
      orderReducer(initialState, {
        type: GET_ORDER_SUCCESS,
        order: {order: 123}
      })
    ).toEqual(
      {
        ...initialState,
        order: {order: 123}
      }
    );
  });

  it("should set orderFailed (GET_ORDER_FAILED)", () => {
    expect(
      orderReducer(initialState, {
        type: GET_ORDER_FAILED
      })
    ).toEqual(
      {
        ...initialState,
        orderFailed: true,
      }
    );
  });

  it("should set order: {} (ORDER_RESET)", () => {
    expect(
      orderReducer(initialState, {
        type: ORDER_RESET
      })
    ).toEqual(
      {
        ...initialState
      }
    );
  });
});