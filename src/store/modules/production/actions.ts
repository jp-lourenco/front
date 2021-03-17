import { BatchCode, Production } from './types';

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

export function getProductionsByUserRequest() {
  return {
    type: '@production/GET_PRODUCTIONS_BY_USER_REQUEST',
  };
}

export function getProductionsByUserSuccess({
  productions,
}: {
  productions: Production[];
}) {
  return {
    type: '@production/GET_PRODUCTIONS_BY_USER_SUCCESS',
    payload: {
      productions,
    },
  };
}

export function getProductionsByUserFailure() {
  return {
    type: '@production/GET_PRODUCTIONS_BY_USER_FAILURE',
  };
}

export function setMyProductionsFiltered({
  myProductionsFiltered,
}: {
  myProductionsFiltered: Production[];
}) {
  return {
    type: '@production/SET_MY_PRODUCTIONS_FILTERED',
    payload: { myProductionsFiltered },
  };
}

export function editProductionRequest({ _id }: { _id: string }) {
  return {
    type: '@production/EDIT_PRODUCTION_REQUEST',
    payload: { _id },
  };
}

export function editProductionSuccess() {
  return {
    type: '@production/EDIT_PRODUCTION_SUCCESS',
  };
}

export function editProductionFailure() {
  return {
    type: '@production/EDIT_PRODUCTION_FAILURE',
  };
}

export function setProductionStart({
  production_start,
}: {
  production_start: string | undefined;
}) {
  return {
    type: '@production/SET_PRODUCTION_START',
    payload: { production_start },
  };
}

export function setProductionLocation({
  production_location,
}: {
  production_location: string;
}) {
  return {
    type: '@production/SET_PRODUCTION_LOCATION',
    payload: { production_location },
  };
}

export function setProductionDescription({
  production_description,
}: {
  production_description: string;
}) {
  return {
    type: '@production/SET_PRODUCTION_DESCRIPTION',
    payload: { production_description },
  };
}

export function setProductionEnd({
  production_end,
}: {
  production_end: string | undefined;
}) {
  return {
    type: '@production/SET_PRODUCTION_END',
    payload: { production_end },
  };
}

export function resetFormProduction() {
  return {
    type: '@production/RESET_FORM_PRODUCTION',
  };
}

export function deleteProductionRequest({
  production_id,
}: {
  production_id: string;
}) {
  return {
    type: '@production/DELETE_PRODUCTION_REQUEST',
    payload: {
      production_id,
    },
  };
}

export function deleteProductionSuccess() {
  return {
    type: '@production/DELETE_PRODUCTION_SUCCESS',
  };
}

export function deleteProductionFailure() {
  return {
    type: '@production/DELETE_PRODUCTION_FAILURE',
  };
}
