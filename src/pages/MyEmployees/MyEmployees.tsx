import React, { createContext, useState } from 'react';
import TableHeader from './components/TableHeader';
import EmployeesTable from './components/EmployeesTable';
import CreateEmployeeModal from './components/CreateEmployee/CreateEmployeeModal';
import EditEmployeeModal from './components/EditEmployee/EditEmployeeModal';

export const MyEmployeesContext = createContext({
  employeeIdSelected: '',
  setEmployeeIdSelected: (employeeIdSelected: string) => {},
  visibleCreateModal: false,
  setVisibleCreateModal: (visibleCreateModal: boolean) => {},
  visibleEditModal: false,
  setVisibleEditModal: (visibleCreateModal: boolean) => {},
});

const MyEmployees: React.FC = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [employeeIdSelected, setEmployeeIdSelected] = useState<string>('');

  return (
    <MyEmployeesContext.Provider
      value={{
        visibleCreateModal,
        setVisibleCreateModal,
        visibleEditModal,
        setVisibleEditModal,
        employeeIdSelected,
        setEmployeeIdSelected,
      }}
    >
      <TableHeader />
      <EmployeesTable />
      <CreateEmployeeModal />
      <EditEmployeeModal />
    </MyEmployeesContext.Provider>
  );
};

export default MyEmployees;
