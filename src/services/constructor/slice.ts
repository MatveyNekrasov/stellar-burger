import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface TConstructorItems {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

interface TConstructorState {
  constructorItems: TConstructorItems;
}

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    removeConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    clearConstructorItems: (state) => {
      state.constructorItems = { bun: null, ingredients: [] };
    },
    moveConstructorItemUp: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ] = [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ];
    },
    moveConstructorItemDown: (state, action: PayloadAction<number>) => {
      [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ] = [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ];
    }
  },
  selectors: {
    getСonstructorItems: (state) => state.constructorItems
  }
});

export const {
  addConstructorItem,
  removeConstructorItem,
  clearConstructorItems,
  moveConstructorItemUp,
  moveConstructorItemDown
} = constructorSlice.actions;
export const { getСonstructorItems } = constructorSlice.selectors;
