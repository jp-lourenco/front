import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Modal } from 'antd';
import { Batch } from '../../../store/modules/production/types';
import Table, { ColumnsType } from 'antd/es/table';
import { MySubBatchsContext } from '../MySubBatchs';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleFilled,
} from '@ant-design/icons';
import 'moment/locale/pt-br';
import moment from 'moment';
import DropdownRangePicker from '../../MyProductions/components/DropdownRangePicker';
import {
  getSubBatchsByUserRequest,
  deleteSubBatchRequest,
  setTransformationDescription,
  setProductName,
  setTransformationStart,
  setTransformationEnd,
  setGtin,
  setSscc,
  setExpirationDate,
} from '../../../store/modules/subbatch/actions';
import { useUserRole } from '../../../hooks/useUserRole';
import { SubBatch } from '../../../store/modules/subbatch/types';

interface ObjectKeys {
  [key: string]:
    | string
    | undefined
    | Batch[]
    | null
    | number
    | string[]
    | History[];
}

interface SubBatchProps extends SubBatch, ObjectKeys {}

const { confirm } = Modal;

const rolesAllowedEdit = ['ADMIN_TRANSFORMER', 'MANAGER_TRANSFORMER'];

const ProductionsTable: React.FC = () => {
  const { mySubBatchsFiltered, loadingGetSubBatchsByUserRequest } = useSelector(
    (state: any) => state.subbatch,
  );

  const {
    selectedRowKeys,
    setSelectedRowKeys,
    setSubBatchSelected,
    setVisibleTraceModal,
    setVisibleEditModal,
  } = useContext(MySubBatchsContext);

  const userRole = useUserRole();

  const showModalTrace = (subbatch: SubBatch) => {
    setSubBatchSelected(subbatch);
    setVisibleTraceModal(true);
  };

  const showEditModal = (item: any) => {
    setSubBatchSelected(item);
    dispatch(setProductName({ product_name: item?.product_name }));
    dispatch(setGtin({ gtin: item?.gtin }));
    dispatch(setSscc({ sscc: item?.sscc }));
    dispatch(setExpirationDate({ expiration_date: item?.expiration_date }));
    dispatch(
      setTransformationDescription({
        transformation_description: item?.transformation_description,
      }),
    );

    dispatch(
      setTransformationStart({
        transformation_start: item?.transformation_start,
      }),
    );
    dispatch(
      setTransformationEnd({ transformation_end: item?.transformation_end }),
    );
    setVisibleEditModal(true);
  };

  function showConfirmDeleteSubBatch(item: SubBatchProps) {
    confirm({
      title: 'Tem certeza que deseja excluir esse sub lote?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cuidado! Essa ação não pode ser desfeita.',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        dispatch(deleteSubBatchRequest({ subbatch_id: item?.key }));
      },
      onCancel() {},
    });
  }

  const columns: ColumnsType<SubBatchProps> = [
    {
      title: 'Código do Sublote',
      width: 100,
      dataIndex: 'subbatch_code',
      key: 'subbatch_code',
      fixed: 'left',
      align: 'center',
      sorter: (a: SubBatchProps, b: SubBatchProps) =>
        a.subbatch_code.localeCompare(b.subbatch_code),
    },
    {
      title: 'Nome do produto',
      width: 100,
      dataIndex: 'product_name',
      key: 'product_name',
      fixed: 'left',
      align: 'center',
      sorter: (a: SubBatchProps, b: SubBatchProps) =>
        a.product_name.localeCompare(b.product_name),
    },
    {
      title: 'GTIN',
      width: 100,
      dataIndex: 'gtin',
      key: 'gtin',
      align: 'center',
    },
    {
      title: 'SSCC',
      width: 100,
      dataIndex: 'sscc',
      key: 'sscc',
      align: 'center',
    },
    {
      title: 'Início da transformação',
      dataIndex: 'transformation_start',
      key: 'transformation_start',
      width: 150,
      align: 'center',
      render: (item) => item && moment(item).format('LL'),
      sorter: (a: SubBatchProps, b: SubBatchProps, sortOrder) => {
        if (sortOrder === 'ascend') {
          if (a.transformation_start === undefined) {
            return 1;
          } else if (b.transformation_start === undefined) {
            return -1;
          }
        } else {
          if (a.transformation_start === undefined) {
            return -1;
          } else if (b.transformation_start === undefined) {
            return 1;
          }
        }
        return (
          moment(a.transformation_start).unix() -
          moment(b.transformation_start).unix()
        );
      },
      filterDropdown: DropdownRangePicker,
      onFilter: (value: any, record: SubBatchProps) => {
        if (record.transformation_start === undefined) {
          return false;
        }
        if (
          moment(record.transformation_start).isBetween(
            value['start'],
            value['end'],
            'days',
            '[]',
          )
        ) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      title: 'Fim da transformação',
      dataIndex: 'transformation_end',
      key: 'transformation_end',
      width: 150,
      align: 'center',
      render: (item) => item && moment(item).format('LL'),
      sorter: (a: SubBatchProps, b: SubBatchProps, sortOrder) => {
        if (sortOrder === 'ascend') {
          if (a.transformation_end === undefined) {
            return 1;
          } else if (b.transformation_end === undefined) {
            return -1;
          }
        } else {
          if (a.transformation_end === undefined) {
            return -1;
          } else if (b.transformation_end === undefined) {
            return 1;
          }
        }
        return (
          moment(a.transformation_end).unix() -
          moment(b.transformation_end).unix()
        );
      },
      filterDropdown: DropdownRangePicker,
      onFilter: (value: any, record: SubBatchProps) => {
        if (record.transformation_end === undefined) {
          return false;
        }
        if (
          moment(record.transformation_end).isBetween(
            value['start'],
            value['end'],
            'days',
            '[]',
          )
        ) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      title: 'Descrição da transformação',
      dataIndex: 'transformation_description',
      key: 'transformation_description',
      width: 150,
      align: 'center',
      sorter: (a: SubBatchProps, b: SubBatchProps, sortOrder) => {
        if (sortOrder === 'ascend') {
          if (a.transformation_description === undefined) {
            return 1;
          } else if (b.transformation_description === undefined) {
            return -1;
          }
        } else {
          if (a.transformation_description === undefined) {
            return -1;
          } else if (b.transformation_description === undefined) {
            return 1;
          }
        }
        return a.transformation_description.localeCompare(
          b.transformation_description,
        );
      },
    },
    {
      title: 'Quantidade transformada',
      dataIndex: 'total_transformed',
      key: 'total_transformed',
      sorter: (a: SubBatch, b: SubBatch, sortOrder) => {
        if (sortOrder === 'ascend') {
          if (a.processed_quantity === undefined) {
            return 1;
          } else if (b.processed_quantity === undefined) {
            return -1;
          }
        } else {
          if (a.processed_quantity === undefined) {
            return -1;
          } else if (b.processed_quantity === undefined) {
            return 1;
          }
        }
        return a.processed_quantity - b.processed_quantity;
      },
      render: (item) => {
        return item ? <p>{item}kg</p> : '';
      },
      width: 100,
    },
    {
      title: 'Data de validade',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      width: 150,
      align: 'center',
      render: (item) => item && moment(item).format('LL'),
      sorter: (a: SubBatch, b: SubBatch, sortOrder) => {
        if (sortOrder === 'ascend') {
          if (a.expiration_date === undefined) {
            return 1;
          } else if (b.expiration_date === undefined) {
            return -1;
          }
        } else {
          if (a.expiration_date === undefined) {
            return -1;
          } else if (b.expiration_date === undefined) {
            return 1;
          }
        }
        return (
          moment(a.expiration_date).unix() - moment(b.expiration_date).unix()
        );
      },
      filterDropdown: DropdownRangePicker,
      onFilter: (value: any, record: SubBatch) => {
        if (record.expiration_date === undefined) {
          return false;
        }
        if (
          moment(record.expiration_date).isBetween(
            value['start'],
            value['end'],
            'days',
            '[]',
          )
        ) {
          return true;
        } else {
          return false;
        }
      },
    },
    {
      title: 'Estado atual',
      dataIndex: 'current_state',
      key: 'current_state',
      filters: [
        { text: 'Produtor cadastrou', value: 'Produtor cadastrou' },
        { text: 'Produtor enviou', value: 'Produtor enviou' },
        { text: 'Transportador recebeu', value: 'Transportador recebeu' },
        { text: 'Transportador enviou', value: 'Transportador enviou' },
        { text: 'Armazenista recebeu', value: 'Armazenista recebeu' },
        { text: 'Armazenista enviou', value: 'Armazenista enviou' },
        { text: 'Transformador recebeu', value: 'Transformador recebeu' },
        { text: 'Transformador enviou', value: 'Transformador enviou' },
        { text: 'Lojista recebeu', value: 'Lojista recebeu' },
      ],
      sorter: (a: SubBatch, b: SubBatch) =>
        a.current_state.localeCompare(b.current_state),
      onFilter: (value: any, record: SubBatch) =>
        record.current_state.indexOf(value) === 0,
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'current_state',
      key: 'status',
      filters: [
        { text: 'Finalizado', value: 'Finalizado' },
        { text: 'Em progresso', value: 'Em progresso' },
      ],
      onFilter: (value: any, record: SubBatch) => {
        if (value === 'Finalizado') {
          return record.current_state === 'Lojista recebeu';
        } else {
          return record.current_state !== 'Lojista recebeu';
        }
      },
      sorter: (a: SubBatch) => {
        if (a.current_state === 'Lojista recebeu') {
          return 1;
        } else {
          return 0;
        }
      },
      render: (item: string) => {
        if (item === 'Lojista recebeu') {
          return (
            <span>
              <Badge status="success" />
              Finalizado
            </span>
          );
        } else {
          return (
            <span>
              <Badge status="processing" />
              Em progresso
            </span>
          );
        }
      },
      width: 100,
    },
    {
      title: 'Visualizar Rastreabilidade',
      dataIndex: 'subbatch_code',
      key: 'subbatch_code',
      width: 100,
      render: (dataIndex: any, batch: any) => {
        if (batch?.history?.length > 0) {
          if (
            batch?.history[batch?.history?.length - 1]?.transition.includes(
              'tentou',
            )
          ) {
            return (
              <span>
                <InfoCircleFilled
                  style={{ color: '#faad14', marginRight: 3 }}
                />
                <a onClick={() => showModalTrace(batch)}>Visualizar</a>
              </span>
            );
          }
        }
        return (
          <span>
            <a onClick={() => showModalTrace(batch)}>Visualizar</a>
          </span>
        );
      },
    },
    {
      title: 'Gerir Informação',
      width: 100,
      className: rolesAllowedEdit.includes(userRole) ? 'show' : 'hide',
      dataIndex: '1',
      key: '1',
      align: 'center',
      render: (_, item: SubBatchProps) => {
        if (rolesAllowedEdit.includes(userRole)) {
          return (
            <>
              <a onClick={() => showEditModal(item)}>
                <EditOutlined />
              </a>

              <a
                onClick={() => showConfirmDeleteSubBatch(item)}
                style={{ marginLeft: 5, color: '#ff2000' }}
              >
                <DeleteOutlined />
              </a>
            </>
          );
        }
      },
    },
  ];

  const getColumns = () => {
    return columns.filter(({ className }) => {
      if (className === 'hide') {
        return false;
      } else {
        return true;
      }
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubBatchsByUserRequest());
  }, []);

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      rowSelection={rowSelection}
      loading={loadingGetSubBatchsByUserRequest}
      className="components-table-demo-nested"
      columns={getColumns()}
      dataSource={mySubBatchsFiltered}
      scroll={{ x: true }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '25', '50', '100'],
      }}
    />
  );
};

export default ProductionsTable;
