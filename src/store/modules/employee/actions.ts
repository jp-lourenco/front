import { Employee } from './types';

export function getEmployeesRequest() {
  return {
    type: '@employee/GET_EMPLOYEES_REQUEST',
  };
}

export function getEmployeesSuccess({ employees }: { employees: Employee[] }) {
  return {
    type: '@employee/GET_EMPLOYEES_SUCCESS',
    payload: {
      employees,
    },
  };
}

export function getEmployeesFailure() {
  return {
    type: '@employee/GET_EMPLOYEES_FAILURE',
  };
}

export function setMyEmployeesFiltered({
  myEmployeesFiltered,
}: {
  myEmployeesFiltered: Employee[];
}) {
  return {
    type: '@employee/SET_MY_EMPLOYEES_FILTERED',
    payload: { myEmployeesFiltered },
  };
}

export function setEmail({ email }: { email: string }) {
  return {
    type: '@employee/SET_EMAIL',
    payload: { email },
  };
}

export function createEmployeeRequest() {
  return {
    type: '@employee/CREATE_EMPLOYEE_REQUEST',
  };
}

export function createEmployeeSuccess() {
  return {
    type: '@employee/CREATE_EMPLOYEE_SUCCESS',
  };
}

export function createEmployeeFailure() {
  return {
    type: '@employee/CREATE_EMPLOYEE_FAILURE',
  };
}
