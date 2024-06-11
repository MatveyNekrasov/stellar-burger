import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

interface TIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsList: (state) => state.ingredients,
    getIngredientsListById: (state, id: string) =>
      state.ingredients.filter((ingredient) => ingredient._id === id),
    getIngredientsListByIds: (state, idList: string[]) =>
      state.ingredients.filter((ingredient) => idList.includes(ingredient._id)),
    getLoading: (state) => state.isLoading,
    getBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getMains: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  getLoading,
  getIngredientsList,
  getBuns,
  getMains,
  getSauces,
  getIngredientsListById,
  getIngredientsListByIds
} = ingredientsSlice.selectors;
