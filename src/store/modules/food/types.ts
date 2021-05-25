export interface FoodState {
  loadingGetFoodsRequest: boolean;
  foods: Food[];
  foodsFiltered: Food[];
  error: boolean;
  name: string;
  category: string;
  loadingCreateFoodRequest: boolean;
}

export interface Food {
  _id: string;
  food_name: string;
  category: string;
}
