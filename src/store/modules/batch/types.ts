export interface BatchState {
  loadingReadQrcodeRequest: boolean;
  loadingEditBatchRequest: boolean;
  error: boolean;
  msg: string;
  batch_code: string;
  packing_date: string;
  packing_size: number;
  processed_quantity: number;
  transformation_description: string;
  amount_produced: number;
}

export interface Production {
  title: string;
  producer_id: string;
  category: string;
  food_name: string;
  created: string;
  updated: string;
  Batchs: Batch[] | null;
}

export interface Batch {
  _id: string;
  batch_code: string;
  current_state: string;
  history: History[] | undefined;
}
export interface History {
  date: string;
  transition: string;
  user_id: string;
}
