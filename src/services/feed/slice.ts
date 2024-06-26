import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeed, getOrderByNumber } from './actions';

export interface TFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  previewOrder: TOrder | null;
}

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  previewOrder: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (state) => state,
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday,
    getFeedLoading: (state) => state.isLoading,
    getPreviewOrder: (state) => state.previewOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.previewOrder = action.payload[0];
        state.isLoading = false;
      });
  }
});

export const {
  getFeedOrders,
  getFeedLoading,
  getFeedTotal,
  getFeedTotalToday,
  getFeedState,
  getPreviewOrder
} = feedSlice.selectors;
