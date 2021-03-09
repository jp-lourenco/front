import { BatchCode } from './types';

export function createProductionRequest() {
  return {
    type: '@production/CREATE_PRODUCTION_REQUEST',
  };
}

export function createProductionSuccess() {
  return {
    type: '@production/CREATE_PRODUCTION_SUCCESS',
  };
}

export function createProductionFailure() {
  return {
    type: '@production/CREATE_PRODUCTION_FAILURE',
  };
}

export function setTitle({ title }: { title: string }) {
  return {
    type: '@production/SET_TITLE',
    payload: { title },
  };
}

export function setCategory({ category }: { category: string }) {
  return {
    type: '@production/SET_CATEGORY',
    payload: { category },
  };
}

export function setFood({ food_name }: { food_name: string }) {
  return {
    type: '@production/SET_FOOD',
    payload: { food_name },
  };
}

export function addBatchCodes() {
  return {
    type: '@production/ADD_BATCH_CODES',
  };
}

export function removeBatchCodes({ index }: { index: number }) {
  return {
    type: '@production/REMOVE_BATCH_CODES',
    payload: { index },
  };
}

export function setBatchCodes({
  batch_code,
  index,
}: {
  batch_code: BatchCode;
  index: number;
}) {
  return {
    type: '@production/SET_BATCH_CODES',
    payload: { batch_code, index },
  };
}
