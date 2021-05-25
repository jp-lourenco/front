import { FoodState } from './types';
import { AnyAction } from 'redux';

const initialState: FoodState = {
  error: false,
  loadingGetFoodsRequest: false,
  foods: [],
  foodsFiltered: [],
  name: '',
  category: '',
  loadingCreateFoodRequest: false,
};

export default function food(
  state = initialState,
  action: AnyAction,
): FoodState {
  switch (action.type) {
    case '@food/GET_FOODS_REQUEST':
      return {
        ...state,
        loadingGetFoodsRequest: true,
      };
    case '@food/GET_FOODS_SUCCESS':
      return {
        ...state,
        loadingGetFoodsRequest: false,
        foods: action.payload.foods,
        foodsFiltered: action.payload.foods,
      };
    case '@food/GET_FOODS_FAILURE':
      return {
        ...state,
        loadingGetFoodsRequest: false,
      };
    case '@food/SET_FOODS_FILTERED':
      return {
        ...state,
        foodsFiltered: action.payload.foodsFiltered,
      };
    case '@food/CREATE_FOOD_REQUEST':
      return {
        ...state,
        loadingCreateFoodRequest: true,
        error: false,
      };
    case '@food/CREATE_FOOD_SUCCESS':
      return {
        ...state,
        loadingCreateFoodRequest: false,
        error: false,
      };
    case '@food/CREATE_FOOD_FAILURE':
      return {
        ...state,
        error: true,
        loadingCreateFoodRequest: false,
      };
    case '@food/SET_NAME':
      return {
        ...state,
        name: action.payload.name,
      };
    case '@food/SET_CATEGORY':
      return {
        ...state,
        category: action.payload.category,
      };
    default:
      return state;
  }
}
