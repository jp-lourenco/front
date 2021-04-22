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

export function setName({ name }: { name: string }) {
  return {
    type: '@employee/SET_NAME',
    payload: { name },
  };
}

export function setRole({ role }: { role: string }) {
  return {
    type: '@employee/SET_ROLE',
    payload: { role },
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

export function deleteEmployeeRequest({
  employee_id,
}: {
  employee_id: string;
}) {
  return {
    type: '@employee/DELETE_EMPLOYEE_REQUEST',
    payload: {
      employee_id,
    },
  };
}

export function deleteEmployeeSuccess() {
  return {
    type: '@employee/DELETE_EMPLOYEE_SUCCESS',
  };
}

export function deleteEmployeeFailure() {
  return {
    type: '@employee/DELETE_EMPLOYEE_FAILURE',
  };
}
