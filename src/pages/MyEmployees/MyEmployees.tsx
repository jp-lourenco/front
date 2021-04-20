import React, { createContext, useState } from 'react';
import TableHeader from './components/TableHeader';
import EmployeesTable from './components/EmployeesTable';
import CreateEmployeeModal from './components/CreateEmployee/CreateEmployeeModal';

export const MyEmployeesContext = createContext({
  visibleCreateModal: false,
  setVisibleCreateModal: (visibleCreateModal: boolean) => {},
});

const MyEmployees: React.FC = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);

  return (
    <MyEmployeesContext.Provider
      value={{
        visibleCreateModal,
        setVisibleCreateModal,
      }}
    >
      <TableHeader />
      <EmployeesTable />
      <CreateEmployeeModal />
    </MyEmployeesContext.Provider>
  );
};

export default MyEmployees;
