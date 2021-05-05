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

export function readQrcodeFailure({ msg }: { msg: string }) {
  return {
    type: '@batch/READ_QRCODE_FAILURE',
    payload: {
      msg,
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

export function getBatchRequest({ batchId }: { batchId: string }) {
  return {
    type: '@batch/GET_BATCH_REQUEST',
    payload: {
      batchId,
    },
  };
}

export function getBatchSuccess() {
  return {
    type: '@batch/GET_BATCH_SUCCESS',
  };
}

export function getBatchFailure({ msg }: { msg: string }) {
  return {
    type: '@batch/GET_BATCH_FAILURE',
    payload: {
      msg,
    },
  };
}

export function editBatchRequest({ batch_id }: { batch_id: string }) {
  return {
    type: '@batch/EDIT_BATCH_REQUEST',
    payload: {
      batch_id,
    },
  };
}

export function editBatchTransformerRequest({
  batch_id,
}: {
  batch_id: string;
}) {
  return {
    type: '@batch/EDIT_BATCH_TRANSFORMER_REQUEST',
    payload: {
      batch_id,
    },
  };
}

export function editBatchSuccess() {
  return {
    type: '@batch/EDIT_BATCH_SUCCESS',
  };
}

export function editBatchFailure() {
  return {
    type: '@batch/EDIT_BATCH_FAILURE',
  };
}

export function setBatchCode({ batch_code }: { batch_code: string }) {
  return {
    type: '@batch/SET_BATCH_CODE',
    payload: { batch_code },
  };
}

export function setAmountProduced({
  amount_produced,
}: {
  amount_produced: number;
}) {
  return {
    type: '@batch/SET_AMOUNT_PRODUCED',
    payload: { amount_produced },
  };
}

export function setPackingSize({ packing_size }: { packing_size: number }) {
  return {
    type: '@batch/SET_PACKING_SIZE',
    payload: { packing_size },
  };
}

export function setTransformationDescription({
  transformation_description,
}: {
  transformation_description: string;
}) {
  return {
    type: '@batch/SET_TRANSFORMATION_DESCRIPTION',
    payload: { transformation_description },
  };
}

export function setProcessedQuantity({
  processed_quantity,
}: {
  processed_quantity: number;
}) {
  return {
    type: '@batch/SET_PROCESSED_QUANTITY',
    payload: { processed_quantity },
  };
}

export function setPackingDate({
  packing_date,
}: {
  packing_date: string | undefined;
}) {
  return {
    type: '@batch/SET_PACKING_DATE',
    payload: { packing_date },
  };
}
