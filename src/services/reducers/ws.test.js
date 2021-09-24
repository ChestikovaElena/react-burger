import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_UPDATE_ORDER
} from '../actions/ws.js';
import { wsReducer } from './ws';

const initialState = {
  wsConnected: false,
  wsConnectionRequest: false,
  wsConnectionFailed: false,
  orders: [],
  total: null,
  totalToday: null
};

const comparisonState = {
  orders: [
    { id: "1", name: "Заказ"},
    { id: "2", name: "Заказ"},
    { id: "3", name: "Заказ"},
  ],
  total: 100,
  totalToday: 3
};

describe("wsReducer", () => {
  it("should return the initial state", () => {
    expect(
      wsReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should set wsConnectionRequest (WS_CONNECTION_START)", () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_START,
      })
    ).toEqual(
      {
        ...initialState,
        wsConnectionRequest: true
      }
    );
  });

  it("should set wsConnected (WS_CONNECTION_SUCCESS)", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnectionRequest: true
        },
        {
          type: WS_CONNECTION_SUCCESS,
        })
    ).toEqual(
      {
        ...initialState,
        wsConnectionRequest: false,
        wsConnected: true
      }
    );
  });

  it("should set wsConnected (WS_CONNECTION_FAILED)", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnectionRequest: true
        },
        {
          type: WS_CONNECTION_FAILED,
        })
    ).toEqual(
      {
        ...initialState,
        wsConnected: false,
        wsConnectionRequest: false,
        wsConnectionFailed: true
      }
    );
  });

  it("should set wsConnected (WS_CONNECTION_CLOSED)", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          wsConnected: true
        },
        {
          type: WS_CONNECTION_CLOSED,
        })
    ).toEqual(
      {
        ...initialState,
        wsConnected: false
      }
    );
  });

  it("should set orders in empty array (WS_GET_MESSAGE)", () => {
    expect(
      wsReducer(initialState,
        {
          type: WS_GET_MESSAGE,
          payload: comparisonState
        })
    ).toEqual(
      {
        ...initialState,
        ...comparisonState
      }
    );
  });

  it("should set orders in nonempty array (WS_GET_MESSAGE)", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          orders: [
            { id: "1", name: "Заказ"},
            { id: "2", name: "Заказ"},
          ]
        },
        {
          type: WS_GET_MESSAGE,
          payload: comparisonState
        })
    ).toEqual(
      {
        ...initialState,
        ...comparisonState
      }
    );
  });

  it("should set updating order (WS_UPDATE_ORDER)", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          orders: [
            { _id: "1", name: "Заказ", isUpdatingOrder: true},
            { _id: "2", name: "Заказ"},
          ]
        },
        {
          type: WS_UPDATE_ORDER,
          updateOrder: { _id: "2", name: "Заказ", isUpdatingOrder: true}
        })
    ).toEqual(
      {
        ...initialState,
        orders: [
          { _id: "1", name: "Заказ", isUpdatingOrder: true},
          { _id: "2", name: "Заказ", isUpdatingOrder: true}
        ]
      }
    );
  });
});