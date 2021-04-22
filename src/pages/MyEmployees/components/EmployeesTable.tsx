import React, { useContext, useEffect } from 'react';
import { Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEmployeeRequest,
  getEmployeesRequest,
} from '../../../store/modules/employee/actions';
import { ColumnsType } from 'antd/lib/table';
import { Employee } from '../../../store/modules/employee/types';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { MyEmployeesContext } from '../MyEmployees';

interface ObjectKeys {
  [key: string]: string;
}

interface EmployeeProps extends Employee, ObjectKeys {}

const { confirm } = Modal;

const EmployeesTable = () => {
  const { myEmployeesFiltered, loadingGetEmployeesRequest } = useSelector(
    (state: any) => state.employee,
  );

  const { setEmployeeIdSelected, setVisibleEditModal } = useContext(
    MyEmployeesContext,
  );

  const showEditModal = (item: any) => {
    setEmployeeIdSelected(item['_id']);
    setVisibleEditModal(true);
  };

  const showConfirmDeleteEmployee = (item: any) => {
    confirm({
      title: 'Tem certeza que deseja excluir esse funcionário?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cuidado! Essa ação não pode ser desfeita.',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        dispatch(deleteEmployeeRequest({ employee_id: item?._id }));
      },
      onCancel() {},
    });
  };

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
    {
      title: 'Gerir Informação',
      width: 100,
      dataIndex: '1',
      key: '1',
      align: 'center',
      render: (_, item: any) => {
        return (
          <>
            <a onClick={() => showEditModal(item)}>
              <EditOutlined />
            </a>

            <a
              onClick={() => showConfirmDeleteEmployee(item)}
              style={{ marginLeft: 5, color: '#ff2000' }}
            >
              <DeleteOutlined />
            </a>
          </>
        );
      },
    },
  ];

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
