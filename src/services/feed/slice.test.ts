import { getFeed, getOrderByNumber } from './actions';
import { TFeedState, feedSlice, initialState } from './slice';

describe('feed slice', () => {
  const mockOrders = [
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

  const mockPendingState: TFeedState = {
    ...initialState,
    isLoading: true
  };

  const mockFulfilledState: TFeedState = {
    ...initialState,
    orders: mockOrders,
    total: 2,
    totalToday: 1
  };

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should change status with "getFeed.pending" action', () => {
    const action = { type: getFeed.pending.type };
    const newState = feedSlice.reducer(initialState, action);
    expect(newState).toEqual(mockPendingState);
  });

  it('should change status with "getFeed.fulfilled" action', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: { orders: mockOrders, total: 2, totalToday: 1 }
    };
    const newState = feedSlice.reducer(initialState, action);
    expect(newState).toEqual(mockFulfilledState);
  });

  it('should change status with "getOrderByNumber.pending" action', () => {
    const action = { type: getOrderByNumber.pending.type };
    const newState = feedSlice.reducer(initialState, action);
    expect(newState).toEqual(mockPendingState);
  });

  it('should change status with "getOrderByNumber.fulfilled" action', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: [mockOrders[0]]
    };
    const newState = feedSlice.reducer(initialState, action);
    expect(newState).toEqual({
      ...mockFulfilledState,
      previewOrder: mockOrders[0],
      orders: [],
      total: 0,
      totalToday: 0
    });
  });
});
