import { TOrder } from '@utils-types';
import { initialState, orderSlice } from './slice';
import { createOrder } from './actions';

describe('order slice', () => {
  const mockOrder: TOrder = {
    _id: '123',
    status: 'done',
    number: 44123,
    name: 'Краторный бургер',
    createdAt: '2024-06-25T20:51:34.303Z',
    updatedAt: '2024-06-25T20:51:34.793Z',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c']
  };

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should change status with "createOrder.pending" action', () => {
    const action = { type: createOrder.pending.type };
    const newState = orderSlice.reducer(initialState, action);
    expect(newState).toEqual({
      orderRequest: true,
      orderModalData: null
    });
  });

  it('should change status with "createOrder.fulfilled" action', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const newState = orderSlice.reducer(initialState, action);
    expect(newState).toEqual({
      orderRequest: false,
      orderModalData: mockOrder
    });
  });

  it('should change status with "createOrder.rejected" action', () => {
    const action = { type: createOrder.rejected.type };
    const newState = orderSlice.reducer(initialState, action);
    expect(newState).toEqual({
      orderRequest: false,
      orderModalData: null
    });
  });
});
