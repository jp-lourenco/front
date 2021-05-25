import React from 'react';
import CompaniesTable from './components/CompaniesTable';
import TableHeader from './components/TableHeader';

const Companies: React.FC = () => {
  return (
    <>
      <TableHeader />
      <CompaniesTable />
    </>
  );
};

export default Companies;
