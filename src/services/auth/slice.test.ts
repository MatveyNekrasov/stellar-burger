import { getUserOrders, login, logout, register, update } from './actions';
import { TAuthState, authSlice, initialState } from './slice';
import { TUser } from '@utils-types';

describe('auth slice', () => {
  const mockUser: TUser = {
    email: 'test@mail.ru',
    name: 'Test user'
  };

  const mockUserOrders = [
    {
      _id: '123',
      status: 'done',
      number: 44123,
      name: 'Краторный бургер',
      createdAt: '2024-06-25T20:51:34.303Z',
      updatedAt: '2024-06-25T20:51:34.793Z',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c']
    },
    {
      _id: '123',
      status: 'done',
      number: 44123,
      name: 'Краторный бургер',
      createdAt: '2024-06-25T20:51:34.303Z',
      updatedAt: '2024-06-25T20:51:34.793Z',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c']
    }
  ];

  const mockPendingState: TAuthState = {
    ...initialState,
    isLoading: true
  };

  const mockFulfilledState: TAuthState = {
    ...initialState,
    user: mockUser,
    isAuthChecked: true
  };

  const mockRejectedState: TAuthState = {
    ...initialState,
    error: 'test error'
  };

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should change status with "login.pending" action', () => {
    const action = { type: login.pending.type };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockPendingState);
  });

  it('should change status with "login.fulfilled" action', () => {
    const action = { type: login.fulfilled.type, payload: mockUser };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockFulfilledState);
  });

  it('should change status with "login.rejected" action', () => {
    const action = {
      type: login.rejected.type,
      error: { message: 'test error' }
    };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockRejectedState);
  });

  it('should change status with "logout.pending" action', () => {
    const action = { type: logout.pending.type };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockPendingState);
  });

  it('should change status with "logout.fulfilled" action', () => {
    const action = { type: logout.fulfilled.type };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual({
      ...mockFulfilledState,
      user: null,
      isAuthChecked: false
    });
  });

  it('should change status with "register.pending" action', () => {
    const action = { type: register.pending.type };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockPendingState);
  });

  it('should change status with "register.fulfilled" action', () => {
    const action = { type: register.fulfilled.type, payload: mockUser };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockFulfilledState);
  });

  it('should change status with "register.rejected" action', () => {
    const action = {
      type: register.rejected.type,
      error: { message: 'test error' }
    };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockRejectedState);
  });

  it('should change status with "update.pending" action', () => {
    const action = { type: update.pending.type };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockPendingState);
  });

  it('should change status with "update.fulfilled" action', () => {
    const action = { type: update.fulfilled.type, payload: mockUser };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockFulfilledState);
  });

  it('should change status with "update.rejected" action', () => {
    const action = {
      type: update.rejected.type,
      error: { message: 'test error' }
    };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockRejectedState);
  });

  it('should change status with "getUserOrders.pending" action', () => {
    const action = { type: getUserOrders.pending.type };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual(mockPendingState);
  });

  it('should change status with "getUserOrders.fulfilled" action', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockUserOrders
    };
    const newState = authSlice.reducer(initialState, action);
    expect(newState).toEqual({
      ...mockFulfilledState,
      user: null,
      isAuthChecked: false,
      userOrders: mockUserOrders
    });
  });
});
