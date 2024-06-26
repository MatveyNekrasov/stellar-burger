import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrder } from './actions';

interface TOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const { getOrderModalData, getOrderRequest } = orderSlice.selectors;
export const { deleteOrderModalData } = orderSlice.actions;
