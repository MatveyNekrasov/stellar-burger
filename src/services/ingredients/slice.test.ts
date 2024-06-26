import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';
import { ingredientsSlice, initialState } from './slice';

describe('ingredients slice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa0946',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      proteins: 808,
      fat: 689,
      carbohydrates: 609,
      calories: 986,
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
      image_mobile:
        'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
      image_large:
        'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    }
  ];

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should change status with "getIngredients.pending" action', () => {
    const action = { type: getIngredients.pending.type };
    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState).toEqual({
      isLoading: true,
      ingredients: []
    });
  });

  it('should change status with "getIngredients.fulfilled" action', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState).toEqual({
      isLoading: false,
      ingredients: mockIngredients
    });
  });

  it('should change status with "getIngredients.rejected" action', () => {
    const action = { type: getIngredients.rejected.type };
    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState).toEqual({
      isLoading: false,
      ingredients: []
    });
  });
});
