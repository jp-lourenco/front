export interface EmployeeState {
  loadingGetEmployeesRequest: boolean;
  myEmployees: Employee[];
  myEmployeesFiltered: Employee[];
  email: string;
  role: string;
  name: string;
  loadingCreateEmployeeRequest: boolean;
  error: boolean;
}

export interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
}
