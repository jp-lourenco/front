import { SubBatchState } from './types';
import { AnyAction } from 'redux';

const initialState: SubBatchState = {
  error: false,
  product_name: '',
  transformation_start: '',
  transformation_end: '',
  transformation_description: '',
  subbatch_code: '',
  gtin: '',
  sscc: '',
  expiration_date: '',
  loadingGetSubBatchsByUserRequest: false,
  mySubBatchs: [],
  mySubBatchsFiltered: [],
  loadingEditSubBatchRequest: false,
  loadingCreateSubBatchRequest: false,
  batch_code: '',
  amount_transformed: 0,
  batch_codes: [],
};

export default function production(
  state = initialState,
  action: AnyAction,
): SubBatchState {
  switch (action.type) {
    case '@subbatch/CREATE_SUB_BATCH_REQUEST':
      return {
        ...state,
        loadingCreateSubBatchRequest: true,
        error: false,
      };
    case '@subbatch/CREATE_SUB_BATCH_SUCCESS':
      return {
        ...state,
        loadingCreateSubBatchRequest: false,
        error: false,
        product_name: '',
        transformation_start: '',
        transformation_end: '',
        transformation_description: '',
        subbatch_code: '',
        batch_code: '',
        amount_transformed: 0,
        batch_codes: [],
      };
    case '@subbatch/CREATE_SUB_BATCH_FAILURE':
      return {
        ...state,
        error: true,
        loadingCreateSubBatchRequest: false,
        product_name: '',
        transformation_start: '',
        transformation_end: '',
        transformation_description: '',
        subbatch_code: '',
        batch_code: '',
        amount_transformed: 0,
        batch_codes: [],
      };
    case '@subbatch/SET_PRODUCT_NAME':
      return {
        ...state,
        product_name: action.payload.product_name,
      };
    case '@subbatch/REMOVE_BATCH_CODES':
      state.batch_codes.splice(action.payload.index, 1);
      return {
        ...state,
        batch_codes: state.batch_codes,
      };
    case '@subbatch/ADD_BATCH_CODES':
      state.batch_codes.push({
        batch_code: '',
        amount_transformed: 1,
        amount_produced: 1,
      });
      return {
        ...state,
        batch_codes: state.batch_codes,
      };
    case '@subbatch/SET_BATCH_CODES':
      state.batch_codes[action.payload.index] = action.payload.batch_code;
      return {
        ...state,
        batch_codes: state.batch_codes,
      };
    case '@subbatch/SET_BATCH_CODE':
      return {
        ...state,
        batch_code: action.payload.batch_code,
      };
    case '@subbatch/SET_SUB_BATCH_CODE':
      return {
        ...state,
        subbatch_code: action.payload.subbatch_code,
      };
    case '@subbatch/SET_AMOUNT_TRANSFORMED':
      return {
        ...state,
        amount_transformed: action.payload.amount_transformed,
      };
    case '@subbatch/GET_SUB_BATCHS_BY_USER_REQUEST':
      return {
        ...state,
        loadingGetSubBatchsByUserRequest: true,
      };
    case '@subbatch/GET_SUB_BATCHS_BY_USER_SUCCESS':
      return {
        ...state,
        loadingGetSubBatchsByUserRequest: false,
        mySubBatchs: action.payload.subbatchs,
        mySubBatchsFiltered: action.payload.subbatchs,
      };
    case '@subbatch/GET_SUB_BATCHS_BY_USER_FAILURE':
      return {
        ...state,
        loadingGetSubBatchsByUserRequest: false,
      };
    case '@subbatch/SET_MY_SUB_BATCHS_FILTERED':
      return {
        ...state,
        mySubBatchsFiltered: action.payload.mySubBatchsFiltered,
      };
    case '@subbatch/SET_TRANSFORMATION_START':
      return {
        ...state,
        transformation_start: action.payload.transformation_start,
      };
    case '@subbatch/SET_TRANSFORMATION_DESCRIPTION':
      return {
        ...state,
        transformation_description: action.payload.transformation_description,
      };
    case '@subbatch/SET_TRANSFORMATION_END':
      return {
        ...state,
        transformation_end: action.payload.transformation_end,
      };
    case '@production/SET_GTIN':
      return {
        ...state,
        gtin: action.payload.gtin,
      };
    case '@production/SET_SSCC':
      return {
        ...state,
        sscc: action.payload.sscc,
      };
    case '@production/SET_EXPIRATION_DATE':
      return {
        ...state,
        expiration_date: action.payload.expiration_date,
      };
    case '@subbatch/EDIT_SUB_BATCH_REQUEST':
      return {
        ...state,
        loadingEditSubBatchRequest: true,
        error: false,
      };
    case '@subbatch/EDIT_SUB_BATCH_SUCCESS':
      return {
        ...state,
        loadingEditSubBatchRequest: false,
        error: false,
        product_name: '',
        transformation_start: '',
        transformation_end: '',
        transformation_description: '',
      };
    case '@subbatch/EDIT_SUB_BATCH_FAILURE':
      return {
        ...state,
        error: true,
        loadingEditSubBatchRequest: false,
        product_name: '',
        transformation_start: '',
        transformation_end: '',
        transformation_description: '',
      };
    case '@subbatch/RESET_FORM_PRODUCTION':
      return {
        ...state,
        product_name: '',
        sscc: '',
        gtin: '',
        expiration_date: '',
        transformation_start: '',
        transformation_end: '',
        transformation_description: '',
        subbatch_code: '',
        batch_code: '',
        amount_transformed: 0,
        batch_codes: [],
      };
    default:
      return state;
  }
}
