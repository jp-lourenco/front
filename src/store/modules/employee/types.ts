export interface EmployeeState {
  loadingGetEmployeesRequest: boolean;
  myEmployees: Employee[];
  myEmployeesFiltered: Employee[];
  email: string;
  loadingCreateEmployeeRequest: boolean;
  error: boolean;
}

export interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
}
