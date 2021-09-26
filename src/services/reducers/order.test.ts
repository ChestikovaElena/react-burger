import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ORDER_RESET
} from '../actions/order';
import { orderReducer, TOrderState } from './order';
import { TOrderFull } from '../types/data';

const mockedOrder: TOrderFull = {
  ingredients: [
    {
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    },
    {
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    }
  ],
  _id: '614b7bf7dab0f3001bb07702',
  owner: 
  {
    name: 'Лена',
    email: 'mokrousova_elena@mail.ru',
    createdAt: '2021-08-25T13:46:04.383Z',
    updatedAt: '2021-09-20T10:41:43.084Z'
  },
  status: 'done',
  name: 'Флюоресцентный бургер',
  createdAt: '2021-09-22T18:54:47.671Z',
  updatedAt: '2021-09-22T18:54:47.857Z',
  number: 3768,
  price: 1976
};

const initialState: TOrderState = {
  order: {},
  orderRequest: false,
  orderFailed: false,
};

describe("orderReducer", () => {
  it("should return the initial state", () => {
    expect(
      orderReducer(undefined, {type: undefined})
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
        order: mockedOrder
      })
    ).toEqual(
      {
        ...initialState,
        order: mockedOrder
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