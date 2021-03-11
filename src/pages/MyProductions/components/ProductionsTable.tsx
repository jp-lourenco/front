import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'antd';
import {
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
import { EditOutlined } from '@ant-design/icons';
import 'moment/locale/pt-br';
import moment from 'moment';

interface ObjectKeys {
  [key: string]: string | undefined | Batch[] | null;
}

interface ProductionProps extends Production, ObjectKeys {}

const ProductionsTable: React.FC = () => {
  const {
    setBatchSelected,
    setVisibleTraceModal,
    setProductionSelected,
    setVisibleEditModal,
  } = useContext(MyProductionsContext);

  const showModalTrace = (batch: any) => {
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

  const columns: ColumnsType<ProductionProps> = [
    {
      title: 'Título',
      width: 100,
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      align: 'center',
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: 'Categoria',
      width: 100,
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      sorter: (a: any, b: any) => a.category.localeCompare(b.category),
    },
    {
      title: 'Alimento',
      width: 100,
      dataIndex: 'food_name',
      key: 'food_name',
      align: 'center',
      sorter: (a: any, b: any) => a.food_name.localeCompare(b.food_name),
    },
    {
      title: 'Início da produção',
      dataIndex: 'production_start',
      key: 'production_start',
      width: 150,
      align: 'center',
      render: (item) => item && moment(item).format('llll'),
    },
    {
      title: 'Local da produção',
      dataIndex: 'production_location',
      key: 'production_location',
      width: 150,
      align: 'center',
    },
    {
      title: 'Fim da produção',
      dataIndex: 'production_end',
      key: 'production_end',
      width: 150,
      align: 'center',
      render: (item) => item && moment(item).format('llll'),
    },
    {
      title: 'Descrição da producão',
      dataIndex: 'production_description',
      key: 'production_description',
      width: 150,
      align: 'center',
    },
    {
      title: 'Adicionar Informação',
      width: 100,
      dataIndex: '1',
      key: '1',
      align: 'center',
      render: (_, item) => (
        <a onClick={() => showEditModal(item)}>
          <EditOutlined />
        </a>
      ),
    },
  ];

  const expandedRowRender = (record: any) => {
    const columns: any = [
      {
        title: 'Código do lote',
        dataIndex: 'batch_code',
        key: 'batch_code',
        sorter: (a: any, b: any) => a.batch_code.localeCompare(b.batch_code),
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
        sorter: (a: any, b: any) =>
          a.current_state.localeCompare(b.current_state),
        onFilter: (value: string, record: any) =>
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
        onFilter: (value: string, record: any) => {
          if (value === 'Finalizado') {
            return record.current_state === 'Lojista recebeu';
          } else {
            return record.current_state !== 'Lojista recebeu';
          }
        },
        sorter: (a: any) => {
          if (a.current_state === 'Lojista recebeu') {
            return true;
          } else {
            return false;
          }
        },
        render: (item: any) => {
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
        render: (dataIndex: any, batch: any) => (
          <a onClick={() => showModalTrace(batch)}>Visualizar</a>
        ),
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

  const {
    myProductionsFiltered,
    loadingGetProductionsByUserRequest,
  } = useSelector((state: any) => state.production);

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
    />
  );
};

export default ProductionsTable;
