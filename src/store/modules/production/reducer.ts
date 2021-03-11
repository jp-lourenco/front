import { ProductionState } from './types';
import { AnyAction } from 'redux';

const initialState: ProductionState = {
  loadingCreateProductionRequest: false,
  error: false,
  title: '',
  category: '',
  food_name: '',
  production_start: '',
  production_end: '',
  production_location: '',
  production_description: '',
  batch_codes: [],
  loadingGetProductionsByUserRequest: false,
  myProductions: [],
  myProductionsFiltered: [],
  loadingEditProductionRequest: false,
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
        title: '',
        category: '',
        food_name: '',
        batch_codes: [],
      };
    case '@production/CREATE_PRODUCTION_FAILURE':
      return {
        ...state,
        error: true,
        loadingCreateProductionRequest: false,
        title: '',
        category: '',
        food_name: '',
        batch_codes: [],
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
    case '@production/GET_PRODUCTIONS_BY_USER_REQUEST':
      return {
        ...state,
        loadingGetProductionsByUserRequest: true,
      };
    case '@production/GET_PRODUCTIONS_BY_USER_SUCCESS':
      return {
        ...state,
        loadingGetProductionsByUserRequest: false,
        myProductions: action.payload.productions,
        myProductionsFiltered: action.payload.productions,
      };
    case '@production/GET_PRODUCTIONS_BY_USER_FAILURE':
      return {
        ...state,
        loadingGetProductionsByUserRequest: false,
      };
    case '@production/SET_MY_PRODUCTIONS_FILTERED':
      return {
        ...state,
        myProductionsFiltered: action.payload.myProductionsFiltered,
      };
    case '@production/SET_PRODUCTION_START':
      return {
        ...state,
        production_start: action.payload.production_start,
      };
    case '@production/SET_PRODUCTION_LOCATION':
      return {
        ...state,
        production_location: action.payload.production_location,
      };
    case '@production/SET_PRODUCTION_DESCRIPTION':
      return {
        ...state,
        production_description: action.payload.production_description,
      };
    case '@production/SET_PRODUCTION_END':
      return {
        ...state,
        production_end: action.payload.production_end,
      };
    case '@production/EDIT_PRODUCTION_REQUEST':
      return {
        ...state,
        loadingEditProductionRequest: true,
        error: false,
      };
    case '@production/EDIT_PRODUCTION_SUCCESS':
      return {
        ...state,
        loadingEditProductionRequest: false,
        error: false,
        title: '',
        production_start: '',
        production_end: '',
        production_location: '',
        production_description: '',
        batch_codes: [],
      };
    case '@production/EDIT_PRODUCTION_FAILURE':
      return {
        ...state,
        error: true,
        loadingEditProductionRequest: false,
        title: '',
        production_start: '',
        production_end: '',
        production_location: '',
        production_description: '',
        batch_codes: [],
      };
    default:
      return state;
  }
}
