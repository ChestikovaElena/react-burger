import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/data-ingredients';
import { dataReducer, TDataIngredientsState } from './data-ingredients';

const initialState: TDataIngredientsState = {
  data: [],
  dataRequest: false,
  dataFailed: false
}

const mockedData = [{
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  name: "Краторная булка N-200i",
  price: 1255,
  proteins: 80,
  type: "bun",
  __v: 0,
  _id: "60d3b41abdacab0026a733c6"
},
{
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  name: "Флюоресцентная булка R2-D3",
  price: 988,
  proteins: 44,
  type: "bun",
  __v: 0,
  _id: "60d3b41abdacab0026a733c7"
}];

describe("dataReducer", () => {
  it("should return the initial state", () => {
    expect(dataReducer(undefined, {type: undefined})).toEqual(initialState);
  });

  it("should set dataRequest (GET_INGREDIENTS_REQUEST)", () => {
    expect(
      dataReducer(initialState, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual(
      {
        ...initialState,
        dataRequest: true
      }
    );
  });

  it("should set data (GET_INGREDIENTS_SUCCESS)", () => {
    expect(
      dataReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        data: mockedData
        
      })
    ).toEqual(
      {
        ...initialState,
        data: mockedData
      }
    );
  });

  it("should set dataFailed (GET_INGREDIENTS_FAILED)", () => {
    expect(
      dataReducer(initialState, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual(
      {
        ...initialState,
        dataFailed: true
      }
    );
  });
})