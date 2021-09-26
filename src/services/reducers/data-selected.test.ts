import {
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  REORDER_SELECTED_INGREDIENTS,
  CLEAR_SELECTED_INGREDIENTS
} from '../actions/data-selected';
import { dataSelectedReducer, TDataSelectedState } from './data-selected';

const initialState: TDataSelectedState = {
  dataSelected: [],
};

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
  _id: "60d3b41abdacab0026a733c6",
  customID: "60d3b41abdacab0026add"
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
  _id: "60d3b41abdacab0026a733c7",
  customID: "63d3b44545gbdacab0026add"
}];

describe('dataSelectedReducer', () => {
  it("should return the initial state", () => {
    expect(
      dataSelectedReducer(undefined, {type: undefined})
    ).toEqual(initialState);
  });

  it("should set dataSelected with initial state (ADD_SELECTED_INGREDIENT)", () => {
    expect(
      dataSelectedReducer(initialState, {
        type: ADD_SELECTED_INGREDIENT,
        newDataSelected: mockedData
      })
    ).toEqual(
      {
        dataSelected: mockedData
      }
    );
  });

  it("should set dataSelected with nonempty state (ADD_SELECTED_INGREDIENT)", () => {
    expect(
      dataSelectedReducer(
        {
          dataSelected: mockedData.filter((item, index) => index === 0)
        },
        {
          type: ADD_SELECTED_INGREDIENT,
          newDataSelected: mockedData
        }
      )
    ).toEqual(
      {
        dataSelected: mockedData
      }
    );
  });

  it("should delete item with customID from dataSelected (DELETE_SELECTED_INGREDIENT)", () => {
    expect(
      dataSelectedReducer(
        {
          dataSelected: mockedData
        },
        {
          type: DELETE_SELECTED_INGREDIENT,
          customID: "60d3b41abdacab0026add"
        }
      )
    ).toEqual(
      {
        dataSelected: mockedData.filter(item => item.customID !== "60d3b41abdacab0026add")
      }
    );
  });

  it("should change items in dataSelected (REORDER_SELECTED_INGREDIENTS)", () => {
    expect(
      dataSelectedReducer(
        {
          dataSelected: mockedData
        },
        {
          type: REORDER_SELECTED_INGREDIENTS,
          dragIndex: 1,
          hoverIndex: 0
        }
      )
    ).toEqual(
      {
        dataSelected: [
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
            _id: "60d3b41abdacab0026a733c7",
            customID: "63d3b44545gbdacab0026add"
          },
          {
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
          _id: "60d3b41abdacab0026a733c6",
          customID: "60d3b41abdacab0026add"
        }]
      }
    );
  });

  it("should clear dataSelected (CLEAR_SELECTED_INGREDIENTS)", () => {
    expect(
      dataSelectedReducer(
        {
          dataSelected: mockedData
        },
        {
          type: CLEAR_SELECTED_INGREDIENTS
        }
      )
    ).toEqual(
      {
        dataSelected: []
      }
    );
  });
})
