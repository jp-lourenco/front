import { BatchState } from './types';
import { AnyAction } from 'redux';

const initialState: BatchState = {
  loadingReadQrcodeRequest: false,
  error: false,
  message: '',
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
        message: action.payload.message,
      };
    default:
      return state;
  }
}
