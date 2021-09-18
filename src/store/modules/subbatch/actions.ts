import { BatchCode } from '../production/types';
import { SubBatch } from './types';

export function createSubBatchRequest() {
  return {
    type: '@subbatch/CREATE_SUB_BATCH_REQUEST',
  };
}

export function createSubBatchSuccess() {
  return {
    type: '@subbatch/CREATE_SUB_BATCH_SUCCESS',
  };
}

export function createSubBatchFailure() {
  return {
    type: '@subbatch/CREATE_SUB_BATCH_FAILURE',
  };
}

export function setProductName({ product_name }: { product_name: string }) {
  return {
    type: '@subbatch/SET_PRODUCT_NAME',
    payload: { product_name },
  };
}

export function setSscc({ sscc }: { sscc: string }) {
  return {
    type: '@production/SET_SSCC',
    payload: { sscc },
  };
}

export function setGtin({ gtin }: { gtin: string }) {
  return {
    type: '@production/SET_GTIN',
    payload: { gtin },
  };
}

export function setExpirationDate({
  expiration_date,
}: {
  expiration_date: string | undefined;
}) {
  return {
    type: '@production/SET_EXPIRATION_DATE',
    payload: { expiration_date },
  };
}

export function setBatchCode({ batch_code }: { batch_code: string }) {
  return {
    type: '@subbatch/SET_BATCH_CODE',
    payload: { batch_code },
  };
}

export function setAmountTrasformed({
  amount_transformed,
}: {
  amount_transformed: number;
}) {
  return {
    type: '@subbatch/SET_AMOUNT_TRANSFORMED',
    payload: { amount_transformed },
  };
}

export function addBatchCodes() {
  return {
    type: '@subbatch/ADD_BATCH_CODES',
  };
}

export function removeBatchCodes({ index }: { index: number }) {
  return {
    type: '@subbatch/REMOVE_BATCH_CODES',
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
    type: '@subbatch/SET_BATCH_CODES',
    payload: { batch_code, index },
  };
}

export function getSubBatchsByUserRequest() {
  return {
    type: '@subbatch/GET_SUB_BATCHS_BY_USER_REQUEST',
  };
}

export function getSubBatchsByUserSuccess({
  subbatchs,
}: {
  subbatchs: SubBatch[];
}) {
  return {
    type: '@subbatch/GET_SUB_BATCHS_BY_USER_SUCCESS',
    payload: {
      subbatchs,
    },
  };
}

export function getSubBatchsByUserFailure() {
  return {
    type: '@subbatch/GET_SUB_BATCHS_BY_USER_FAILURE',
  };
}

export function setMySubBatchsFiltered({
  mySubBatchsFiltered,
}: {
  mySubBatchsFiltered: SubBatch[];
}) {
  return {
    type: '@subbatch/SET_MY_SUB_BATCHS_FILTERED',
    payload: { mySubBatchsFiltered },
  };
}

export function editSubBatchRequest({ _id }: { _id: string }) {
  return {
    type: '@subbatch/EDIT_SUB_BATCH_REQUEST',
    payload: { _id },
  };
}

export function editSubBatchSuccess() {
  return {
    type: '@subbatch/EDIT_SUB_BATCH_SUCCESS',
  };
}

export function editSubBatchFailure() {
  return {
    type: '@subbatch/EDIT_SUB_BATCH_FAILURE',
  };
}

export function setSubBatchCode({
  subbatch_code,
}: {
  subbatch_code: string | undefined;
}) {
  return {
    type: '@subbatch/SET_SUB_BATCH_CODE',
    payload: { subbatch_code },
  };
}

export function setTransformationStart({
  transformation_start,
}: {
  transformation_start: string | undefined;
}) {
  return {
    type: '@subbatch/SET_TRANSFORMATION_START',
    payload: { transformation_start },
  };
}

export function setTransformationDescription({
  transformation_description,
}: {
  transformation_description: string;
}) {
  return {
    type: '@subbatch/SET_TRANSFORMATION_DESCRIPTION',
    payload: { transformation_description },
  };
}

export function setTransformationEnd({
  transformation_end,
}: {
  transformation_end: string | undefined;
}) {
  return {
    type: '@subbatch/SET_TRANSFORMATION_END',
    payload: { transformation_end },
  };
}

export function resetFormSubBacth() {
  return {
    type: '@subbatch/RESET_FORM_SUB_BATCH',
  };
}

export function deleteSubBatchRequest({
  subbatch_id,
}: {
  subbatch_id: string;
}) {
  return {
    type: '@subbatch/DELETE_SUB_BATCH_REQUEST',
    payload: {
      subbatch_id,
    },
  };
}

export function deleteSubBatchSuccess() {
  return {
    type: '@subbatch/DELETE_SUB_BATCH_SUCCESS',
  };
}

export function deleteSubBatchFailure() {
  return {
    type: '@subbatch/DELETE_SUB_BATCH_FAILURE',
  };
}
