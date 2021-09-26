import {
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_FAILED,
  UPDATE_ORDER_INFO
}  from '../actions/order-info';
import { TOrder, TOrderUpdated } from '../types/data';
import { orderInfoReducer, TOrderInfoState } from './order-info';

const initialState: TOrderInfoState = {
  orderRequest: false,
  orderRequestSuccess: false,
  orderRequestFailed: false,
  orderInfo: []
}

const mockedData: TOrder[] = [
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

const mockedUpdateData: TOrderUpdated = 
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

describe('orderInfoReducer', () => {
  it("should return the initial state", () => {
    expect(
      orderInfoReducer(undefined, {type: undefined})
    ).toEqual(initialState);
  });

  it("should set orderRequest (GET_ORDER_INFO_REQUEST)", () => {
    expect(
      orderInfoReducer(initialState, {
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
        orders: mockedData
      })
    ).toEqual(
      {
        ...initialState,
        orderInfo: mockedData,
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
          orderInfo: mockedData
        },
        {
        type: UPDATE_ORDER_INFO,
        updateOrder: mockedUpdateData
        })
    ).toEqual(
      {
        ...initialState,
        orderInfo: [mockedUpdateData],
      }
    )
  })
})