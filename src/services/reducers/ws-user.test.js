import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
  WS_USER_CONNECTION_FAILED,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_UPDATE_ORDER
} from '../actions/ws';
import { wsUserReducer } from './ws-user';
import { TOrder } from '../types/data';

const initialState = {
  wsConnected: false,
  wsConnectionRequest: false,
  wsConnectionFailed: false,
  orders: [],
  total: null,
  totalToday: null
}

const mockedData = [
  {
    ingredients: [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45e9",
      "60d3463f7034a000269f45e9"
    ],
    _id: "123",
    name: "Галактический бургер",
    status: 'done',
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z"
  }
];

const mockedUpdateData = 
  {
    ingredients: [
      {
        id: "60d3463f7034a000269f45e7",
        count: 1,
        name: "Булка",
        price: 20,
        image: "https://code.s3.yandex.net/react/code/bun"
      },
      {
        id: "60d3463f7034a000269f45e9",
        count: 2,
        name: "Мясо",
        price: 220,
        image: "https://code.s3.yandex.net/react/code/meat"
      }
    ],
    _id: "123",
    name: "Галактический бургер",
    status: 'done',
    number: 0,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z",
    isUpdateOrder: true
  }
;

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
      wsUserReducer(undefined, {type: undefined})
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