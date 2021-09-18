import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Modal } from 'antd';
import {
  deleteProductionRequest,
  getProductionsByUserRequest,
  setProductionDescription,
  setProductionEnd,
  setProductionLocation,
  setProductionStart,
  setTempMax,
  setTempMin,
  setTitle,
  setHumiMin,
  setHumiMax,
  setMyProductionsFiltered,
  setGtin,
  setSscc,
  setExpirationDate,
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
import {
  deleteBatchRequest,
  setAmountProduced,
  setBatchCode,
  setPackingDate,
  setPackingSize,
  setProcessedQuantity,
  setTransformationDescription,
} from '../../../store/modules/batch/actions';
import { useUserRole } from '../../../hooks/useUserRole';

interface ObjectKeys {
  [key: string]: string | undefined | Batch[] | null | number;
}

interface ProductionProps extends Production, ObjectKeys {}

const { confirm } = Modal;

const rolesAllowedEdit = ['ADMIN_PRODUCER', 'MANAGER_PRODUCER'];

const rolesAllowedEditBatch = [
  'ADMIN_PRODUCER',
  'MANAGER_PRODUCER',
  'ADMIN_TRANSFORMER',
  'MANAGER_TRANSFORMER',
];

const ProductionsTable: React.FC = () => {
  const {
    categories,
    foods,
    locations,
    myProductionsFiltered,
    loadingGetProductionsByUserRequest,
  } = useSelector((state: any) => state.production);

  const {
    selectedRowKeys,
    setSelectedRowKeys,
    setBatchSelected,
    setVisibleTraceModal,
    setProductionSelected,
    setVisibleEditModal,
    setVisibleEditFilesModal,
    setVisibleEditBatchModal,
  } = useContext(MyProductionsContext);

  const userRole = useUserRole();

  const showModalTrace = (batch: Batch) => {
    setBatchSelected(batch);
    setVisibleTraceModal(true);
  };

  const showModalEditFiles = (item: any) => {
    setProductionSelected(item);
    setVisibleEditFilesModal(true);
  };

  const showEditModal = (item: any) => {
    setProductionSelected(item);
    dispatch(setTitle({ title: item?.title }));
    dispatch(setGtin({ gtin: item?.gtin }));
    dispatch(setSscc({ sscc: item?.sscc }));
    dispatch(setExpirationDate({ expiration_date: item?.expiration_date }));
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
    dispatch(setTempMax({ temp_max: item?.temp_max }));
    dispatch(setTempMin({ temp_min: item?.temp_min }));
    dispatch(setHumiMax({ humi_max: item?.humi_max }));
    dispatch(setHumiMin({ humi_min: item?.humi_min }));
    setVisibleEditModal(true);
  };

  const showEditBatchModal = (item: any) => {
    setBatchSelected(item);
    dispatch(setBatchCode({ batch_code: item?.batch_code }));
    dispatch(setAmountProduced({ amount_produced: item?.amount_produced }));
    dispatch(
      setTransformationDescription({
        transformation_description: item?.transformation_description,
      }),
    );
    dispatch(
      setProcessedQuantity({ processed_quantity: item?.processed_quantity }),
    );
    dispatch(setPackingSize({ packing_size: item?.packing_size }));
    dispatch(setPackingDate({ packing_date: item?.packing_date }));
    setVisibleEditBatchModal(true);
  };

  function showConfirmDeleteProduction(item: ProductionProps) {
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

  function showConfirmDeleteBatch(item: Batch) {
    confirm({
      title: 'Tem certeza que deseja excluir esse lote?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cuidado! Essa ação não pode ser desfeita.',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        dispatch(deleteBatchRequest({ batch_id: item?.key }));
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
      render: (dataIndex: any, production: any) => {
        if (['ADMIN_PRODUCER', 'MANAGER_PRODUCER'].includes(userRole)) {
          return (
            <span>
              <a onClick={() => showModalEditFiles(production)}>{dataIndex}</a>
            </span>
          );
        } else {
          return (
            <span>
              <p>{dataIndex}</p>
            </span>
          );
        }
      },
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
      title: 'Data de validade',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      width: 150,
      align: 'center',
      render: (item) => item && moment(item).format('LL'),
      sorter: (a: ProductionProps, b: ProductionProps, sortOrder) => {
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
      onFilter: (value: any, record: ProductionProps) => {
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
      title: 'Temperatura',
      width: 100,
      key: 'temp',
      children: [
        {
          title: 'Min',
          dataIndex: 'temp_min',
          key: 'temp_min',
          width: 50,
          render: (item) => {
            return item ? <p>{item}°C</p> : '';
          },
        },
        {
          title: 'Max',
          dataIndex: 'temp_max',
          key: 'temp_max',
          width: 50,
          render: (item) => {
            return item ? <p>{item}°C</p> : '';
          },
        },
        {
          title: 'Ideal',
          dataIndex: 'temp_ideal',
          key: 'temp_ideal',
          width: 50,
          render: (item) => {
            return item ? <p>{item}°C</p> : '';
          },
        },
      ],
    },
    {
      title: 'Humidade',
      width: 100,
      key: 'humi',
      children: [
        {
          title: 'Min',
          dataIndex: 'humi_min',
          key: 'humi_min',
          width: 50,
          render: (item) => {
            return item ? <p>{item}%</p> : '';
          },
        },
        {
          title: 'Max',
          dataIndex: 'humi_max',
          key: 'humi_max',
          width: 50,
          render: (item) => {
            return item ? <p>{item}%</p> : '';
          },
        },
        {
          title: 'Ideal',
          dataIndex: 'humi_ideal',
          key: 'humi_ideal',
          width: 50,
          render: (item) => {
            return item ? <p>{item}%</p> : '';
          },
        },
      ],
    },
    {
      title: 'Gerir Informação',
      width: 100,
      className: rolesAllowedEdit.includes(userRole) ? 'show' : 'hide',
      dataIndex: '1',
      key: '1',
      align: 'center',
      render: (_, item: ProductionProps) => {
        if (rolesAllowedEdit.includes(userRole)) {
          return (
            <>
              <a onClick={() => showEditModal(item)}>
                <EditOutlined />
              </a>

              <a
                onClick={() => showConfirmDeleteProduction(item)}
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
        title: 'Quantidade produzida',
        dataIndex: 'amount_produced',
        key: 'amount_produced',
        sorter: (a: Batch, b: Batch, sortOrder) => {
          if (sortOrder === 'ascend') {
            if (a.amount_produced === undefined) {
              return 1;
            } else if (b.amount_produced === undefined) {
              return -1;
            }
          } else {
            if (a.amount_produced === undefined) {
              return -1;
            } else if (b.amount_produced === undefined) {
              return 1;
            }
          }
          return a.amount_produced - b.amount_produced;
        },
        render: (item) => {
          return item ? <p>{item}kg</p> : '';
        },
        width: 100,
      },
      {
        title: 'Descrição da transformação',
        dataIndex: 'transformation_description',
        key: 'transformation_description',
        sorter: (a: Batch, b: Batch, sortOrder) => {
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
        width: 150,
      },
      {
        title: 'Quantidade transformada',
        dataIndex: 'processed_quantity',
        key: 'processed_quantity',
        sorter: (a: Batch, b: Batch, sortOrder) => {
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
        title: 'Tamanho da Embalagem',
        dataIndex: 'packing_size',
        key: 'packing_size',
        sorter: (a: Batch, b: Batch, sortOrder) => {
          if (sortOrder === 'ascend') {
            if (a.packing_size === undefined) {
              return 1;
            } else if (b.packing_size === undefined) {
              return -1;
            }
          } else {
            if (a.packing_size === undefined) {
              return -1;
            } else if (b.packing_size === undefined) {
              return 1;
            }
          }
          return a.packing_size.localeCompare(b.packing_size);
        },
        render: (item) => {
          return item ? <p>{item}gr</p> : '';
        },
        width: 150,
      },
      {
        title: 'Data de embalamento',
        dataIndex: 'packing_date',
        key: 'packing_date',
        width: 150,
        align: 'center',
        render: (item) => item && moment(item).format('LL'),
        sorter: (a: Batch, b: Batch, sortOrder) => {
          if (sortOrder === 'ascend') {
            if (a.packing_date === undefined) {
              return 1;
            } else if (b.packing_date === undefined) {
              return -1;
            }
          } else {
            if (a.packing_date === undefined) {
              return -1;
            } else if (b.packing_date === undefined) {
              return 1;
            }
          }
          return moment(a.packing_date).unix() - moment(b.packing_date).unix();
        },
        filterDropdown: DropdownRangePicker,
        onFilter: (value: any, record: Batch) => {
          if (record.packing_date === undefined) {
            return false;
          }
          if (
            moment(record.packing_date).isBetween(
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
        sorter: (a: Batch, b: Batch) =>
          a.current_state.localeCompare(b.current_state),
        onFilter: (value: any, record: Batch) =>
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
        dataIndex: '1',
        className: rolesAllowedEditBatch.includes(userRole) ? 'show' : 'hide',
        key: '1',
        align: 'center',
        render: (_, item: Batch) => {
          if (rolesAllowedEditBatch.includes(userRole)) {
            return (
              <>
                <a onClick={() => showEditBatchModal(item)}>
                  <EditOutlined />
                </a>

                <a
                  onClick={() => showConfirmDeleteBatch(item)}
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
        scroll={{ x: true }}
        columns={getColumns()}
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
      columns={getColumns()}
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
