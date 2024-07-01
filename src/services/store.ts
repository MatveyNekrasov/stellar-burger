import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { authSlice } from './auth/slice';
import { ingredientsSlice } from './ingredients/slice';
import { feedSlice } from './feed/slice';
import { constructorSlice } from './constructor/slice';
import { orderSlice } from './order/slice';

export const rootReducer = combineReducers({
  [authSlice.reducerPath]: authSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [feedSlice.reducerPath]: feedSlice.reducer,
  [constructorSlice.reducerPath]: constructorSlice.reducer,
  [orderSlice.reducerPath]: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
