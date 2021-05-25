import { CompanyState } from './types';
import { AnyAction } from 'redux';

const initialState: CompanyState = {
  error: false,
  loadingGetCompaniesRequest: false,
  loadingApproveCompanyRequest: false,
  companies: [],
  companiesFiltered: [],
};

export default function company(
  state = initialState,
  action: AnyAction,
): CompanyState {
  switch (action.type) {
    case '@company/GET_COMPANIES_REQUEST':
      return {
        ...state,
        loadingGetCompaniesRequest: true,
      };
    case '@company/GET_COMPANIES_SUCCESS':
      return {
        ...state,
        loadingGetCompaniesRequest: false,
        companies: action.payload.companies,
        companiesFiltered: action.payload.companies,
      };
    case '@company/GET_COMPANIES_FAILURE':
      return {
        ...state,
        loadingGetCompaniesRequest: false,
      };
    case '@company/SET_COMPANIES_FILTERED':
      return {
        ...state,
        companiesFiltered: action.payload.companiesFiltered,
      };
    case '@company/APPROVE_COMPANY_REQUEST':
      return {
        ...state,
        loadingApproveCompanyRequest: true,
      };
    case '@company/APPROVE_COMPANY_SUCCESS':
      return {
        ...state,
        loadingApproveCompanyRequest: false,
      };
    case '@company/APPROVE_COMPANY_FAILURE':
      return {
        ...state,
        loadingApproveCompanyRequest: false,
      };
    default:
      return state;
  }
}
