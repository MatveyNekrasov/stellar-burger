import {
  Draft,
  PayloadAction,
  SerializedError,
  createSlice
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, register, update } from './actions';

interface TAuthState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: SerializedError | undefined;
}

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: undefined
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
    getErrorMessage: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      });
  }
});

export const { setAuthChecked, setUser, setLoading } = authSlice.actions;
export const { getAuthChecked, getUser, getLoading, getErrorMessage } =
  authSlice.selectors;
