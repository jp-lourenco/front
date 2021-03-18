import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Badge, Modal } from 'antd';
import {
  deleteProductionRequest,
  getProductionsByUserRequest,
  setProductionDescription,
  setProductionEnd,
  setProductionLocation,
  setProductionStart,
  setTitle,
} from '../../../store/modules/production/actions';
import { Production, Batch } from '../../../store/modules/production/types';
import Table, { ColumnsType } from 'antd/es/table';
import { MyProductionsContext } from '../MyProductions';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InfoCircleFilled,
} from '@ant-design/icons';
import 'moment/locale/pt-br';
import moment from 'moment';
import DropdownRangePicker from './DropdownRangePicker';

interface ObjectKeys {
  [key: string]: string | undefined | Batch[] | null;
}

interface ProductionProps extends Production, ObjectKeys {}

const { confirm } = Modal;

const ProductionsTable: React.FC = () => {
  const {
    categories,
    foods,
    locations,
    myProductionsFiltered,
    loadingGetProductionsByUserRequest,
  } = useSelector((state: any) => state.production);

  const {
    setBatchSelected,
    setVisibleTraceModal,
    setProductionSelected,
    setVisibleEditModal,
  } = useContext(MyProductionsContext);

  const showModalTrace = (batch: Batch) => {
    setBatchSelected(batch);
    setVisibleTraceModal(true);
  };

  const showEditModal = (item: any) => {
    setProductionSelected(item);
    dispatch(setTitle({ title: item?.title }));
    dispatch(setProductionStart({ production_start: item?.production_start }));
    dispatch(
      setProductionLocation({ production_location: item?.production_location }),
    );
    dispatch(
      setProductionDescription({
        production_description: item?.production_description,
      }),
    );
    dispatch(setProductionEnd({ production_end: item?.production_end }));
    setVisibleEditModal(true);
  };

  function showConfirm(item: ProductionProps) {
    confirm({
      title: 'Tem certeza que deseja excluir essa produção?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cuidado! Essa ação não pode ser desfeita.',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        dispatch(deleteProductionRequest({ production_id: item?.key }));
      },
      onCancel() {},
    });
  }

  const columns: ColumnsType<ProductionProps> = [
    {
      title: 'Título',
      width: 100,
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      align: 'center',
      sorter: (a: ProductionProps, b: ProductionProps) =>
        a.title.localeCompare(b.title),
    },
    {
      title: 'Categoria',
      width: 100,
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      filters: categories,
      sorter: (a: ProductionProps, b: ProductionProps) =>
        a.category.localeCompare(b.category),
      onFilter: (value: any, record: ProductionProps) =>
        record.category.indexOf(value) === 0,
    },
    {
      title: 'Alimento',
      width: 100,
      dataIndex: 'food_name',
      key: 'food_name',
      align: 'center',
      filters: foods,
      sorter: (a: ProductionProps, b: ProductionProps) =>
        a.food_name.localeCompare(b.food_name),
      onFilter: (value: any, record: ProductionProps) =>
        record.food_name.indexOf(value) === 0,
    },
    {
      title: 'Início da produção',
      dataIndex: 'production_start',
      key: 'production_start',
      width: 150,
      align: 'center',
      render: (item) => item && moment(item).format('LL'),
      sorter: (a: ProductionProps, b: ProductionProps, sortOrder) => {
        if (sortOrder === 'ascend') {
          if (a.production_start === undefined) {
            return 1;
          } else if (b.production_start === undefined) {
            return -1;
          }
        } else {
          if (a.production_start === undefined) {
            return -1;
          } else if (b.production_start === undefined) {
            return 1;
          }
        }
        return (
          moment(a.production_start).unix() - moment(b.production_start).unix()
        );
      },
      filterDropdown: DropdownRangePicker,
      onFilter: (value: any, record: ProductionProps) => {
        if (record.production_start === undefined) {
          return false;
        }
        if (
          moment(record.production_start).isBetween(
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
      title: 'Local da produção',
      dataIndex: 'production_location',
      key: 'production_location',
      width: 150,
      align: 'center',
      filters: locations,
      sorter: (a: ProductionProps, b: ProductionProps, sortOrder) => {
        if (sortOrder === 'ascend') {
          if (a.production_location === undefined) {
            return 1;
          } else if (b.production_location === undefined) {
            return -1;
          }
        } else {
          if (a.production_location === undefined) {
            return -1;
          } else if (b.production_location === undefined) {
            return 1;
          }
        }
        return a.production_location.localeCompare(b.production_location);
      },
      onFilter: (value: any, record: ProductionProps) =>
        record?.production_location?.indexOf(value) === 0,
    },
    {
      title: 'Fim da produção',
      dataIndex: 'production_end',
      key: 'production_end',
      width: 150,
      align: 'center',
      render: (item) => item && moment(item).format('LL'),
      sorter: (a: ProductionProps, b: ProductionProps, sortOrder) => {
        if (sortOrder === 'ascend') {
          if (a.production_end === undefined) {
            return 1;
          } else if (b.production_end === undefined) {
            return -1;
          }
        } else {
          if (a.production_end === undefined) {
            return -1;
          } else if (b.production_end === undefined) {
            return 1;
          }
        }
        return (
          moment(a.production_end).unix() - moment(b.production_end).unix()
        );
      },
      filterDropdown: DropdownRangePicker,
      onFilter: (value: any, record: ProductionProps) => {
        if (record.production_end === undefined) {
          return false;
        }
        if (
          moment(record.production_end).isBetween(
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
      title: 'Descrição da producão',
      dataIndex: 'production_description',
      key: 'production_description',
      width: 150,
      align: 'center',
      sorter: (a: ProductionProps, b: ProductionProps, sortOrder) => {
        if (sortOrder === 'ascend') {
          if (a.production_description === undefined) {
            return 1;
          } else if (b.production_description === undefined) {
            return -1;
          }
        } else {
          if (a.production_description === undefined) {
            return -1;
          } else if (b.production_description === undefined) {
            return 1;
          }
        }
        return a.production_description.localeCompare(b.production_description);
      },
    },
    {
      title: 'Gerir Informação',
      width: 100,
      dataIndex: '1',
      key: '1',
      align: 'center',
      render: (_, item: ProductionProps) => (
        <>
          <a onClick={() => showEditModal(item)}>
            <EditOutlined />
          </a>

          <a
            onClick={() => showConfirm(item)}
            style={{ marginLeft: 5, color: '#ff2000' }}
          >
            <DeleteOutlined />
          </a>
        </>
      ),
    },
  ];

  const expandedRowRender = (record: any) => {
    const columns: ColumnsType<Batch> = [
      {
        title: 'Código do lote',
        dataIndex: 'batch_code',
        key: 'batch_code',
        sorter: (a: Batch, b: Batch) =>
          a.batch_code.localeCompare(b.batch_code),
        width: 100,
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
        sorter: (a: Batch, b: Batch) =>
          a.current_state.localeCompare(b.current_state),
        onFilter: (value: any, record: Batch) =>
          record.current_state.indexOf(value) === 0,
        width: 100,
      },
      {
        title: 'Status',
        dataIndex: 'current_state',
        key: 'status',
        filters: [
          { text: 'Finalizado', value: 'Finalizado' },
          { text: 'Em progresso', value: 'Em progresso' },
        ],
        onFilter: (value: any, record: Batch) => {
          if (value === 'Finalizado') {
            return record.current_state === 'Lojista recebeu';
          } else {
            return record.current_state !== 'Lojista recebeu';
          }
        },
        sorter: (a: Batch) => {
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
        dataIndex: 'batch_code',
        key: 'batch_code',
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
        width: 100,
      },
    ];

    return (
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={record.batchs}
        pagination={false}
      />
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductionsByUserRequest());
  }, []);

  return (
    <Table
      loading={loadingGetProductionsByUserRequest}
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender,
        rowExpandable: (record) => (record?.batchs?.length ? true : false),
      }}
      dataSource={myProductionsFiltered}
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
