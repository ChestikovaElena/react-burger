import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
  WS_USER_CONNECTION_FAILED,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_UPDATE_ORDER
} from '../actions/ws.ts';
import { wsUserReducer } from './ws-user';

const initialState = {
  wsConnected: false,
  wsConnectionRequest: false,
  wsConnectionFailed: false,
  orders: [],
  total: null,
  totalToday: null
}

const comparisonState = {
  orders: [
    { id: "1", name: "Заказ"},
    { id: "2", name: "Заказ"},
    { id: "3", name: "Заказ"},
  ],
  total: 100,
  totalToday: 3
};

describe("wsUserReducer", () => {
  it("should return the initial state", () => {
    expect(
      wsUserReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should set wsConnectionRequest (WS_USER_CONNECTION_START)", () => {
    expect(
      wsUserReducer(initialState, {
        type: WS_USER_CONNECTION_START,
      })
    ).toEqual(
      {
        ...initialState,
        wsConnectionRequest: true
      }
    );
  });

  it("should set wsConnected (WS_USER_CONNECTION_SUCCESS)", () => {
    expect(
      wsUserReducer(
        {
          ...initialState,
          wsConnectionRequest: true
        },
        {
          type: WS_USER_CONNECTION_SUCCESS,
        })
    ).toEqual(
      {
        ...initialState,
        wsConnectionRequest: false,
        wsConnected: true
      }
    );
  });

  it("should set wsConnected (WS_USER_CONNECTION_FAILED)", () => {
    expect(
      wsUserReducer(
        {
          ...initialState,
          wsConnectionRequest: true
        },
        {
          type: WS_USER_CONNECTION_FAILED,
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

  it("should set wsConnected (WS_USER_CONNECTION_CLOSED)", () => {
    expect(
      wsUserReducer(
        {
          ...initialState,
          wsConnected: true
        },
        {
          type: WS_USER_CONNECTION_CLOSED,
        })
    ).toEqual(
      {
        ...initialState,
        wsConnected: false
      }
    );
  });

  it("should set orders in empty array (WS_USER_GET_MESSAGE)", () => {
    expect(
      wsUserReducer(initialState,
        {
          type: WS_USER_GET_MESSAGE,
          payload: comparisonState
        })
    ).toEqual(
      {
        ...initialState,
        ...comparisonState
      }
    );
  });

  it("should set orders in nonempty array (WS_USER_GET_MESSAGE)", () => {
    expect(
      wsUserReducer(
        {
          ...initialState,
          orders: [
            { id: "1", name: "Заказ"},
            { id: "2", name: "Заказ"},
          ]
        },
        {
          type: WS_USER_GET_MESSAGE,
          payload: comparisonState
        })
    ).toEqual(
      {
        ...initialState,
        ...comparisonState
      }
    );
  });

  it("should set updating order (WS_USER_UPDATE_ORDER)", () => {
    expect(
      wsUserReducer(
        {
          ...initialState,
          orders: [
            { _id: "1", name: "Заказ", isUpdatingOrder: true},
            { _id: "2", name: "Заказ"},
          ]
        },
        {
          type: WS_USER_UPDATE_ORDER,
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