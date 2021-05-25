import React, { useEffect } from 'react';
import { Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCompaniesRequest,
  approveCompanyRequest,
} from '../../../store/modules/company/actions';
import { ColumnsType } from 'antd/lib/table';
import { Company } from '../../../store/modules/company/types';
import {
  ExclamationCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import 'moment/locale/pt-br';
import moment from 'moment';

interface ObjectKeys {
  [key: string]: string | null;
}

interface CompanyProps extends Company, ObjectKeys {}

const { confirm } = Modal;

const CompaniesTable: React.FC = () => {
  const {
    companiesFiltered,
    loadingGetCompaniesRequest,
    loadingApproveCompanyRequest,
  } = useSelector((state: any) => state.company);

  // const showConfirmDeleteSensor = (item: any) => {
  //   confirm({
  //     title: 'Tem certeza que deseja excluir esse sensor?',
  //     icon: <ExclamationCircleOutlined />,
  //     content: 'Cuidado! Essa ação não pode ser desfeita.',
  //     okText: 'Sim',
  //     cancelText: 'Não',
  //     onOk() {
  //       dispatch(deleteSensorRequest({ sensor_id: item?._id }));
  //     },
  //     onCancel() {},
  //   });
  // };

  const showConfirmApproveCompany = (item: any) => {
    confirm({
      title: 'Tem certeza que deseja aprovar essa empresa?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cuidado! Essa ação não pode ser desfeita.',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        dispatch(approveCompanyRequest({ company_id: item?._id }));
      },
      onCancel() {},
    });
  };

  const columns: ColumnsType<CompanyProps> = [
    {
      title: 'Nome',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      sorter: (a: CompanyProps, b: CompanyProps) =>
        a.name.localeCompare(b.name),
    },
    {
      title: 'Função',
      width: 100,
      dataIndex: 'company_function',
      key: 'company_function',
      align: 'center',
      sorter: (a: CompanyProps, b: CompanyProps) =>
        a.company_function.localeCompare(b.company_function),
    },
    {
      title: 'Email',
      width: 100,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      sorter: (a: CompanyProps, b: CompanyProps) =>
        a.email.localeCompare(b.email),
    },
    {
      title: 'Morada',
      width: 100,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      sorter: (a: CompanyProps, b: CompanyProps) =>
        a.address.localeCompare(b.address),
    },
    {
      title: 'Código postal',
      width: 100,
      dataIndex: 'zip_code',
      key: 'zip_code',
      align: 'center',
      sorter: (a: CompanyProps, b: CompanyProps) =>
        a.zip_code.localeCompare(b.zip_code),
    },
    {
      title: 'NIF',
      width: 100,
      dataIndex: 'nif',
      key: 'nif',
      align: 'center',
      sorter: (a: CompanyProps, b: CompanyProps) => a.nif.localeCompare(b.nif),
    },
    {
      title: 'Telefone',
      width: 100,
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: 'Data de aprovação',
      width: 100,
      dataIndex: 'approved',
      key: 'approved',
      align: 'center',
      render: (dataIndex: any, item: any) => {
        if (dataIndex !== undefined) {
          return (
            <span>
              <p>{moment(dataIndex).format('llll')}</p>
            </span>
          );
        } else {
          return (
            <>
              {loadingApproveCompanyRequest ? (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              ) : (
                <>
                  <a onClick={() => showConfirmApproveCompany(item)}>
                    <CheckOutlined />
                  </a>

                  <a
                    onClick={() => {}}
                    style={{
                      fontSize: '18px',
                      marginLeft: 5,
                      color: '#ff2000',
                    }}
                  >
                    <CloseOutlined />
                  </a>
                </>
              )}
            </>
          );
        }
      },
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompaniesRequest());
  }, []);

  return (
    <Table
      loading={loadingGetCompaniesRequest}
      className="components-table-demo-nested"
      columns={columns}
      dataSource={companiesFiltered}
      scroll={{ x: true }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '25', '50', '100'],
      }}
    />
  );
};

export default CompaniesTable;
