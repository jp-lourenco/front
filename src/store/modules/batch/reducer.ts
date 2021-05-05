import { BatchState } from './types';
import { AnyAction } from 'redux';

const initialState: BatchState = {
  loadingReadQrcodeRequest: false,
  loadingEditBatchRequest: false,
  error: false,
  msg: '',
  batch_code: '',
  packing_date: '',
  packing_size: 0,
  processed_quantity: 0,
  transformation_description: '',
  amount_produced: 0,
};

export default function batch(
  state = initialState,
  action: AnyAction,
): BatchState {
  switch (action.type) {
    case '@batch/READ_QRCODE_REQUEST':
      return {
        ...state,
        loadingReadQrcodeRequest: true,
        error: false,
      };
    case '@batch/READ_QRCODE_SUCCESS':
      return {
        ...state,
        loadingReadQrcodeRequest: false,
        error: false,
      };
    case '@batch/READ_QRCODE_FAILURE':
      return {
        ...state,
        error: true,
        loadingReadQrcodeRequest: false,
        msg: action.payload.msg,
      };
    case '@batch/EDIT_BATCH_REQUEST':
      return {
        ...state,
        loadingEditBatchRequest: true,
        error: false,
      };
    case '@batch/EDIT_BATCH_TRANSFORMER_REQUEST':
      return {
        ...state,
        loadingEditBatchRequest: true,
        error: false,
      };
    case '@batch/EDIT_BATCH_SUCCESS':
      return {
        ...state,
        loadingEditBatchRequest: false,
        error: false,
      };
    case '@batch/EDIT_BATCH_FAILURE':
      return {
        ...state,
        error: true,
        loadingEditBatchRequest: false,
        msg: action.payload.msg,
      };
    case '@batch/SET_BATCH_CODE':
      return {
        ...state,
        batch_code: action.payload.batch_code,
      };
    case '@batch/SET_AMOUNT_PRODUCED':
      return {
        ...state,
        amount_produced: action.payload.amount_produced,
      };
    case '@batch/SET_PACKING_SIZE':
      return {
        ...state,
        packing_size: action.payload.packing_size,
      };
    case '@batch/SET_TRANSFORMATION_DESCRIPTION':
      return {
        ...state,
        transformation_description: action.payload.transformation_description,
      };
    case '@batch/SET_PROCESSED_QUANTITY':
      return {
        ...state,
        processed_quantity: action.payload.processed_quantity,
      };
    case '@batch/SET_PACKING_DATE':
      return {
        ...state,
        packing_date: action.payload.packing_date,
      };
    default:
      return state;
  }
}
