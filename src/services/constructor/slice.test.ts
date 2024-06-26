import {
  addConstructorItem,
  constructorSlice,
  initialState,
  moveConstructorItemDown,
  moveConstructorItemUp,
  removeConstructorItem
} from './slice';
import { TConstructorIngredient } from '@utils-types';

const mockIngredients: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0946',
    id: '123456789',
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
    image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    id: '10203040',
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
    id: '11213141',
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

jest.mock('uuid', () => ({ v4: () => '123456789' }));

describe('burger constructor slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {});

  it('should add ingredient properly', () => {
    const newConstructorState = constructorSlice.reducer(
      initialState,
      addConstructorItem(mockIngredients[0])
    );

    const expectedIngredient =
      newConstructorState.constructorItems.ingredients[0];
    const expectedArrayLength =
      newConstructorState.constructorItems.ingredients.length;

    expect(expectedIngredient).toEqual(mockIngredients[0]);
    expect(expectedArrayLength).toBe(1);
  });

  it('should delete ingredient properly', () => {
    const newConstructorState = constructorSlice.reducer(
      {
        constructorItems: { bun: null, ingredients: mockIngredients }
      },
      removeConstructorItem(mockIngredients[0])
    );
    const expectedArrayLength =
      newConstructorState.constructorItems.ingredients.length;
    const remainingIngredient =
      newConstructorState.constructorItems.ingredients[0];

    expect(expectedArrayLength).toBe(2);
    expect(remainingIngredient).toEqual(mockIngredients[1]);
  });

  it('should change ingredients order properly (upward)', () => {
    const newConstructorState = constructorSlice.reducer(
      {
        constructorItems: { bun: null, ingredients: mockIngredients }
      },
      moveConstructorItemUp(1)
    );

    const expectedFirstIngredient =
      newConstructorState.constructorItems.ingredients[0];
    const expectedSecondIngredient =
      newConstructorState.constructorItems.ingredients[1];

    expect(expectedFirstIngredient).toEqual(mockIngredients[1]);
    expect(expectedSecondIngredient).toEqual(mockIngredients[0]);
  });

  it('should change ingredients order properly (downward)', () => {
    const newConstructorState = constructorSlice.reducer(
      {
        constructorItems: { bun: null, ingredients: mockIngredients }
      },
      moveConstructorItemDown(0)
    );

    const expectedFirstIngredient =
      newConstructorState.constructorItems.ingredients[0];
    const expectedSecondIngredient =
      newConstructorState.constructorItems.ingredients[1];

    expect(expectedFirstIngredient).toEqual(mockIngredients[1]);
    expect(expectedSecondIngredient).toEqual(mockIngredients[0]);
  });
});
