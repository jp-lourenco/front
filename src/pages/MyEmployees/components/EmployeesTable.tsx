import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeesRequest } from '../../../store/modules/employee/actions';
import { ColumnsType } from 'antd/lib/table';
import { Employee } from '../../../store/modules/employee/types';

interface ObjectKeys {
  [key: string]: string;
}

interface EmployeeProps extends Employee, ObjectKeys {}

const columns: ColumnsType<EmployeeProps> = [
  {
    title: 'Nome',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    align: 'center',
    sorter: (a: EmployeeProps, b: EmployeeProps) =>
      a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    width: 100,
    dataIndex: 'email',
    key: 'email',
    align: 'center',
    sorter: (a: EmployeeProps, b: EmployeeProps) =>
      a.email.localeCompare(b.email),
  },
  {
    title: 'Role',
    width: 100,
    dataIndex: 'role',
    key: 'role',
    align: 'center',
    sorter: (a: EmployeeProps, b: EmployeeProps) =>
      a.role.localeCompare(b.role),
  },
];

const EmployeesTable = () => {
  const { myEmployeesFiltered, loadingGetEmployeesRequest } = useSelector(
    (state: any) => state.employee,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeesRequest());
  }, []);

  return (
    <Table
      loading={loadingGetEmployeesRequest}
      className="components-table-demo-nested"
      columns={columns}
      dataSource={myEmployeesFiltered}
      scroll={{ x: true }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '25', '50', '100'],
      }}
    />
  );
};

export default EmployeesTable;
