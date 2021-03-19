export function readQrcodeRequest({ qrcode }: { qrcode: string }) {
  return {
    type: '@batch/READ_QRCODE_REQUEST',
    payload: {
      qrcode,
    },
  };
}

export function readQrcodeSuccess() {
  return {
    type: '@batch/READ_QRCODE_SUCCESS',
  };
}

export function readQrcodeFailure({ message }: { message: string }) {
  return {
    type: '@batch/READ_QRCODE_FAILURE',
    payload: {
      message,
    },
  };
}

export function deleteBatchRequest({ batch_id }: { batch_id: string }) {
  return {
    type: '@batch/DELETE_BATCH_REQUEST',
    payload: {
      batch_id,
    },
  };
}

export function deleteBatchSuccess() {
  return {
    type: '@batch/DELETE_BATCH_SUCCESS',
  };
}

export function deleteBatchFailure() {
  return {
    type: '@batch/DELETE_BATCH_FAILURE',
  };
}
