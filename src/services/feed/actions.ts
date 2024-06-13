import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeed = createAsyncThunk('feed/getAll', async () => {
  const res = await getFeedsApi();
  return res;
});

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrder',
  async (orderNumber: number) => {
    const res = await getOrderByNumberApi(orderNumber);
    return res.orders;
  }
);
