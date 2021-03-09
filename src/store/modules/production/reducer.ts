import { ProductionState } from './types';
import { AnyAction } from 'redux';

const initialState: ProductionState = {
  loadingCreateProductionRequest: false,
  error: false,
  title: '',
  category: '',
  food_name: '',
  batch_codes: [],
};

export default function production(
  state = initialState,
  action: AnyAction,
): ProductionState {
  switch (action.type) {
    case '@production/CREATE_PRODUCTION_REQUEST':
      return {
        ...state,
        loadingCreateProductionRequest: true,
        error: false,
      };
    case '@production/CREATE_PRODUCTION_SUCCESS':
      return {
        ...state,
        loadingCreateProductionRequest: false,
        error: false,
      };
    case '@production/CREATE_PRODUCTION_FAILURE':
      return {
        ...state,
        error: true,
        loadingCreateProductionRequest: false,
      };
    case '@production/SET_TITLE':
      return {
        ...state,
        title: action.payload.title,
      };
    case '@production/SET_CATEGORY':
      return {
        ...state,
        category: action.payload.category,
      };
    case '@production/SET_FOOD':
      return {
        ...state,
        food_name: action.payload.food_name,
      };
    case '@production/REMOVE_BATCH_CODES':
      state.batch_codes.splice(action.payload.index, 1);
      return {
        ...state,
        batch_codes: state.batch_codes,
      };
    case '@production/ADD_BATCH_CODES':
      state.batch_codes.push({ batch_code: '' });
      return {
        ...state,
        batch_codes: state.batch_codes,
      };
    case '@production/SET_BATCH_CODES':
      state.batch_codes[action.payload.index] = action.payload.batch_code;
      return {
        ...state,
        batch_codes: state.batch_codes,
      };
    default:
      return state;
  }
}
