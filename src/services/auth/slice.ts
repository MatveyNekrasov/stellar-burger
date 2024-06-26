import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { getUserOrders, login, logout, register, update } from './actions';

export interface TAuthState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | undefined;
  userOrders: TOrder[];
}

export const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: undefined,
  userOrders: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    getLoading: (state) => state.isLoading,
    getErrorMessage: (state) => state.error,
    getUserOrdersList: (state) => state.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { setAuthChecked, setUser, setLoading } = authSlice.actions;
export const {
  getAuthChecked,
  getUser,
  getLoading,
  getErrorMessage,
  getUserOrdersList
} = authSlice.selectors;
