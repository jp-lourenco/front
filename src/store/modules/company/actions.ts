import { Company } from './types';

export function getCompaniesRequest() {
  return {
    type: '@company/GET_COMPANIES_REQUEST',
  };
}

export function getCompaniesSuccess({ companies }: { companies: Company[] }) {
  return {
    type: '@company/GET_COMPANIES_SUCCESS',
    payload: {
      companies,
    },
  };
}

export function getCompaniesFailure() {
  return {
    type: '@company/GET_COMPANIES_FAILURE',
  };
}

export function setCompaniesFiltered({
  companiesFiltered,
}: {
  companiesFiltered: Company[];
}) {
  return {
    type: '@company/SET_COMPANIES_FILTERED',
    payload: { companiesFiltered },
  };
}

export function approveCompanyRequest({ company_id }: { company_id: string }) {
  return {
    type: '@company/APPROVE_COMPANY_REQUEST',
    payload: {
      company_id,
    },
  };
}

export function approveCompanySuccess() {
  return {
    type: '@company/APPROVE_COMPANY_SUCCESS',
  };
}

export function approveCompanyFailure() {
  return {
    type: '@company/APPROVE_COMPANY_FAILURE',
  };
}
