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
  gtin: string | undefined;
  sscc: string | undefined;
  expiration_date: string | undefined;
  temp_min: number | undefined;
  temp_max: number | undefined;
  temp_ideal: number | undefined;
  humi_min: number | undefined;
  humi_max: number | undefined;
  humi_ideal: number | undefined;
  batch_codes: BatchCode[];
  loadingGetProductionsByUserRequest: boolean;
  myProductions: Production[];
  myProductionsFiltered: Production[];
  loadingEditProductionRequest: boolean;
  categories: Filter[];
  foods: Filter[];
  locations: Filter[];
}
interface Filter {
  text: string;
  value: string;
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
  gtin: string | undefined;
  sscc: string | undefined;
  expiration_date: string | undefined;
  production_start: string | undefined;
  production_description: string | undefined;
  production_end: string | undefined;
  production_location: string | undefined;
  temp_min: number | undefined;
  temp_max: number | undefined;
  temp_ideal: number | undefined;
  humi_min: number | undefined;
  humi_max: number | undefined;
  humi_ideal: number | undefined;
  created: string;
  updated: string;
  batchs: Batch[] | undefined;
}

export interface Batch {
  key: string;
  batch_code: string;
  current_state: string;
  history: History[] | undefined;
  amount_produced: number | undefined;
  transformation_description: string | undefined;
  processed_quantity: number | undefined;
  packing_size: string | undefined;
  packing_date: string | undefined;
}
export interface History {
  date: string;
  transition: string;
  user_id: string;
  max_value_temp: string | undefined;
  min_value_temp: string | undefined;
  average_value_temp: string | undefined;
  max_value_humi: string | undefined;
  min_value_humi: string | undefined;
  average_value_humi: string | undefined;
  values_sensor: any[] | undefined;
}
