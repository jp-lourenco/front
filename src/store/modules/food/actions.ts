import { Food } from './types';

export function getFoodsRequest() {
  return {
    type: '@food/GET_FOODS_REQUEST',
  };
}

export function getFoodsSuccess({ foods }: { foods: Food[] }) {
  return {
    type: '@food/GET_FOODS_SUCCESS',
    payload: {
      foods,
    },
  };
}

export function getFoodsFailure() {
  return {
    type: '@food/GET_FOODS_FAILURE',
  };
}

export function setFoodsFiltered({ foodsFiltered }: { foodsFiltered: Food[] }) {
  return {
    type: '@food/SET_FOODS_FILTERED',
    payload: { foodsFiltered },
  };
}

export function deleteFoodRequest({ food_id }: { food_id: string }) {
  return {
    type: '@food/DELETE_FOOD_REQUEST',
    payload: {
      food_id,
    },
  };
}

export function deleteFoodSuccess() {
  return {
    type: '@food/DELETE_FOODS_SUCCESS',
  };
}

export function deleteFoodFailure() {
  return {
    type: '@food/DELETE_FOODS_FAILURE',
  };
}

export function createFoodRequest() {
  return {
    type: '@food/CREATE_FOOD_REQUEST',
  };
}

export function createFoodSuccess() {
  return {
    type: '@food/CREATE_FOOD_SUCCESS',
  };
}

export function createFoodFailure() {
  return {
    type: '@food/CREATE_FOOD_FAILURE',
  };
}

export function setName({ name }: { name: string }) {
  return {
    type: '@food/SET_NAME',
    payload: { name },
  };
}

export function setCategory({ category }: { category: string }) {
  return {
    type: '@food/SET_CATEGORY',
    payload: { category },
  };
}
