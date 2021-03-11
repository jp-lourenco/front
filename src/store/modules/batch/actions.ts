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
