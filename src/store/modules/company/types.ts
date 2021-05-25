export interface CompanyState {
  loadingGetCompaniesRequest: boolean;
  loadingApproveCompanyRequest: boolean;
  companies: Company[];
  companiesFiltered: Company[];
  error: boolean;
}

export interface Company {
  _id: string;
  name: string;
  company_function: string;
  email: string;
  address: string;
  zip_code: string;
  nif: string;
  phone: string | null;
  approved: string;
}
