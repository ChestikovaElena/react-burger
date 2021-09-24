import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_MESSAGE,
  WS_USER_CONNECTION_FAILED,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_UPDATE_ORDER
} from '../actions/ws';
import { TOrder } from '../types/data';
import { wsUserReducer } from './ws-user';

export const initialState = {
  wsConnected: false,
  wsConnectionRequest: false,
  wsConnectionFailed: false,
  orders: [],
  total: null,
  totalToday: null
};

export const mockedData: TOrder[]= [
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

export const mockedUpdateData: TOrder[]= [
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
];

export const dataFromServer: TOrder= 
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
    _id: "2444",
    name: "Межгалактический бургер",
    status: 'done',
    number: 0,
    createdAt: "2021-07-23T14:43:22.587Z",
    updatedAt: "2021-07-23T14:43:22.603Z",
    isUpdateOrder: true
  };

describe("wsUserReducer", () => {
  it("should return the initial state", () => {
    expect(
      wsUserReducer(undefined, {type: undefined})
    ).toEqual(initialState);
  });

  it("should set wsConnectionRequest (WS_USER_CONNECTION_START)", () => {
    expect(
      wsUserReducer(initialState,
        {
          type: WS_USER_CONNECTION_START,
          wsConnectionRequest: true
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

  it("should set wsConnected (WS_USER_CONNECTION_FAILED)", () => {
    expect(
      wsUserReducer(
        {
          ...initialState,
          wsConnectionRequest: true
        },
        {
          type: WS_USER_CONNECTION_FAILED,
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

  it("should set wsConnected (WS_USER_CONNECTION_CLOSED)", () => {
    expect(
      wsUserReducer(
        {
          ...initialState,
          wsConnected: true
        },
        {
          type: WS_USER_CONNECTION_CLOSED,
          wsConnected: false,
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
      wsUserReducer(
        {
          ...initialState
        },
        {
          type: WS_USER_GET_MESSAGE,
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

  it("should set orders in nonempty array (WS_USER_GET_MESSAGE)", () => {
    expect(
      wsUserReducer(
        {
          ...initialState,
          orders: mockedData,
          total: 2,
          totalToday: 1
        },
        {
          type: WS_USER_GET_MESSAGE,
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

  it("should set updating order (WS_USER_UPDATE_ORDER)", () => {
    expect(
      wsUserReducer(
        {
          ...initialState,
          orders: mockedUpdateData,
        },
        {
          type: WS_USER_UPDATE_ORDER,
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