import { rootReducer } from './store';
import { initialState as authInitialState } from './auth/slice';
import { initialState as ingredientsInitialState } from './ingredients/slice';
import { initialState as feedInitialState } from './feed/slice';
import { initialState as constructorInitialState } from './constructor/slice';
import { initialState as orderInitialState } from './order/slice';

describe('rootReducer', () => {
  it('should create correct store state', () => {
    const testState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const expectedState = {
      auth: { ...authInitialState },
      burgerConstructor: { ...constructorInitialState },
      ingredients: { ...ingredientsInitialState },
      feed: { ...feedInitialState },
      order: { ...orderInitialState }
    };
    expect(testState).toEqual(expectedState);
  });
});
