export interface ProductionState {
  loadingCreateProductionRequest: boolean;
  error: boolean;
  title: string;
  category: string;
  food_name: string;
  production_start: string;
  production_description: string;
  production_end: string;
  production_location: string;
  batch_codes: BatchCode[];
  loadingGetProductionsByUserRequest: boolean;
  myProductions: Production[];
  myProductionsFiltered: Production[];
  loadingEditProductionRequest: boolean;
}

export interface BatchCode {
  batch_code: string;
}

export interface Production {
  key: string;
  title: string;
  producer_id: string;
  category: string;
  food_name: string;
  production_start: string | null;
  production_description: string | null;
  production_end: string | null;
  production_location: string | null;
  created: string;
  updated: string;
  Batchs: Batch[] | null;
}

export interface Batch {
  key: string;
  batch_code: string;
  current_state: string;
  history: History[] | undefined;
}
export interface History {
  date: string;
  transition: string;
  user_id: string;
}
