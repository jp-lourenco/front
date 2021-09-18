export interface SubBatch {
  key: string;
  batch_codes: string[];
  subbatch_code: string;
  product_name: string;
  current_state: string;
  gtin: string | undefined;
  sscc: string | undefined;
  expiration_date: string | undefined;
  history: History[] | undefined;
  transformation_start: string | undefined;
  transformation_end: string | undefined;
  transformation_description: string | undefined;
  processed_quantity: number | undefined;
  packing_size: string | undefined;
  packing_date: string | undefined;
}

export interface SubBatchState {
  loadingCreateSubBatchRequest: boolean;
  error: boolean;
  product_name: string;
  transformation_start: string;
  transformation_end: string;
  transformation_description: string;
  subbatch_code: string;
  loadingGetSubBatchsByUserRequest: boolean;
  mySubBatchs: SubBatch[];
  gtin: string | undefined;
  sscc: string | undefined;
  expiration_date: string | undefined;
  mySubBatchsFiltered: SubBatch[];
  loadingEditSubBatchRequest: boolean;
  batch_code: string;
  amount_transformed: number;
  batch_codes: BatchCode[];
}

export interface BatchCode {
  batch_code: string;
  amount_produced: number;
  amount_transformed: number;
}
