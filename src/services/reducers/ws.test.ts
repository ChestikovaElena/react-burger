import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_FAILED,
  WS_CONNECTION_CLOSED,
  WS_UPDATE_ORDER
} from '../actions/ws';
import { wsReducer } from './ws';
import {
  initialState,
  mockedData,
  mockedUpdateData,
  dataFromServer
} from './ws-user.test';

describe("wsReducer", () => {
  it("should return the initial state", () => {
    expect(
      wsReducer(undefined, {type: undefined})
    ).toEqual(initialState);
  });

  it("should set wsConnectionRequest (WS_CONNECTION_START)", () => {
    expect(
      wsReducer(initialState,
        {
          type: WS_CONNECTION_START,
          wsConnectionRequest: true
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
          wsConnected: true
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
          wsConnected: false,
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
          wsConnected: false,
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
          payload: {orders: [dataFromServer], total: 1, totalToday: 1}
        })
    ).toEqual(
      {
        ...initialState,
        orders: [dataFromServer],
        total: 1,
        totalToday: 1
      }
    );
  });

  it("should set orders in nonempty array (WS_GET_MESSAGE)", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          orders: mockedData,
          total: 2,
          totalToday: 1
        },
        {
          type: WS_GET_MESSAGE,
          payload: {orders: mockedData, total: 3, totalToday: 2}
        })
    ).toEqual(
      {
        ...initialState,
        orders: mockedData,
        total: 3,
        totalToday: 2
      }
    );
  });

  it("should set updating order (WS_UPDATE_ORDER)", () => {
    expect(
      wsReducer(
        {
          ...initialState,
          orders: mockedUpdateData,
        },
        {
          type: WS_UPDATE_ORDER,
          updateOrder: dataFromServer
        })
    ).toEqual(
      {
        ...initialState,
        orders: [
          ...mockedUpdateData,
          dataFromServer
        ]
      }
    );
  });
});