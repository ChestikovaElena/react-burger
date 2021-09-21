import {
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  REORDER_SELECTED_INGREDIENTS,
  CLEAR_SELECTED_INGREDIENTS
} from '../actions/data-selected.ts';
import { dataSelectedReducer } from './data-selected';

const initialState = {
  dataSelected: [],
};

describe('dataSelectedReducer', () => {
  it("should return the initial state", () => {
    expect(
      dataSelectedReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should set dataSelected with initial state (ADD_SELECTED_INGREDIENT)", () => {
    expect(
      dataSelectedReducer(initialState, {
        type: ADD_SELECTED_INGREDIENT,
        newDataSelected: [{id: "1", name: "Булка"}]
      })
    ).toEqual(
      {
        dataSelected: [{id: "1", name: "Булка"}]
      }
    );
  });

  it("should set dataSelected with nonempty state (ADD_SELECTED_INGREDIENT)", () => {
    expect(
      dataSelectedReducer(
        {
          dataSelected: [
            {id: "2", name: "Соус"}
          ]
        },
        {
          type: ADD_SELECTED_INGREDIENT,
          newDataSelected: [
            {id: "1", name: "Булка"},
            {id: "2", name: "Соус"}
          ]
        }
      )
    ).toEqual(
      {
        dataSelected: [
          {id: "1", name: "Булка"},
          {id: "2", name: "Соус"}
        ]
      }
    );
  });

  it("should delete item with customID from dataSelected (DELETE_SELECTED_INGREDIENT)", () => {
    expect(
      dataSelectedReducer(
        {
          dataSelected: [
            {customID: "1", name: "Булка"},
            {customID: "2", name: "Соус"}
          ]
        },
        {
          type: DELETE_SELECTED_INGREDIENT,
          customID: "1"
        }
      )
    ).toEqual(
      {
        dataSelected: [
          {customID: "2", name: "Соус"}
        ]
      }
    );
  });

  it("should change items in dataSelected (REORDER_SELECTED_INGREDIENTS)", () => {
    expect(
      dataSelectedReducer(
        {
          dataSelected: [
            {customID: "1", name: "Булка"},
            {customID: "2", name: "Соус"}
          ]
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
          {customID: "2", name: "Соус"},
          {customID: "1", name: "Булка"}
        ]
      }
    );
  });

  it("should clear dataSelected (CLEAR_SELECTED_INGREDIENTS)", () => {
    expect(
      dataSelectedReducer(
        {
          dataSelected: [
            {customID: "1", name: "Булка"},
            {customID: "2", name: "Соус"}
          ]
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
