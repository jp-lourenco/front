export interface ProductionState {
  loadingCreateProductionRequest: boolean;
  error: boolean;
  title: string;
  category: string;
  food_name: string;
  batch_codes: BatchCode[];
}

export interface BatchCode {
  batch_code: string;
}
