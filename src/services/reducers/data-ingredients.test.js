import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/data-ingredients';
import { dataReducer } from './data-ingredients';

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false
}

describe("dataReducer", () => {
  it("should return the initial state", () => {
    expect(dataReducer(undefined, {})).toEqual(initialState);
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
        data: [
          {id: "1", name: "Булка"},
          {id: "2", name: "Соус"}
        ]
      })
    ).toEqual(
      {
        ...initialState,
        data: [
          {id: "1", name: "Булка"},
          {id: "2", name: "Соус"}
        ]
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