import { EmployeeState } from './types';
import { AnyAction } from 'redux';

const initialState: EmployeeState = {
  loadingCreateEmployeeRequest: false,
  error: false,
  loadingGetEmployeesRequest: false,
  myEmployees: [],
  myEmployeesFiltered: [],
  email: '',
  role: '',
  name: '',
  loadingEditEmployeeRequest: false,
  errorEdit: false,
  roleEdit: '',
};

export default function employee(
  state = initialState,
  action: AnyAction,
): EmployeeState {
  switch (action.type) {
    case '@employee/GET_EMPLOYEES_REQUEST':
      return {
        ...state,
        loadingGetEmployeesRequest: true,
      };
    case '@employee/GET_EMPLOYEES_SUCCESS':
      return {
        ...state,
        loadingGetEmployeesRequest: false,
        myEmployees: action.payload.employees,
        myEmployeesFiltered: action.payload.employees,
      };
    case '@employee/GET_EMPLOYEES_FAILURE':
      return {
        ...state,
        loadingGetEmployeesRequest: false,
      };
    case '@employee/SET_MY_EMPLOYEES_FILTERED':
      return {
        ...state,
        myEmployeesFiltered: action.payload.myEmployeesFiltered,
      };
    case '@employee/SET_EMAIL':
      return {
        ...state,
        email: action.payload.email,
      };
    case '@employee/SET_NAME':
      return {
        ...state,
        name: action.payload.name,
      };
    case '@employee/SET_ROLE':
      return {
        ...state,
        role: action.payload.role,
      };
    case '@employee/SET_ROLE_EDIT':
      return {
        ...state,
        roleEdit: action.payload.role,
      };
    case '@employee/CREATE_EMPLOYEE_REQUEST':
      return {
        ...state,
        loadingCreateEmployeeRequest: true,
        error: false,
      };
    case '@employee/CREATE_EMPLOYEE_SUCCESS':
      return {
        ...state,
        loadingCreateEmployeeRequest: false,
        error: false,
      };
    case '@employee/CREATE_EMPLOYEE_FAILURE':
      return {
        ...state,
        error: true,
        loadingCreateEmployeeRequest: false,
      };
    case '@employee/EDIT_EMPLOYEE_REQUEST':
      return {
        ...state,
        loadingEditEmployeeRequest: true,
        errorEdit: false,
      };
    case '@employee/EDIT_EMPLOYEE_SUCCESS':
      return {
        ...state,
        loadingEditEmployeeRequest: false,
        errorEdit: false,
      };
    case '@employee/EDIT_EMPLOYEE_FAILURE':
      return {
        ...state,
        errorEdit: true,
        loadingEditEmployeeRequest: false,
      };
    default:
      return state;
  }
}
