import React, { useEffect } from 'react';
import { Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFoodsRequest,
  deleteFoodRequest,
} from '../../../store/modules/food/actions';
import { ColumnsType } from 'antd/lib/table';
import { Food } from '../../../store/modules/food/types';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import 'moment/locale/pt-br';

interface ObjectKeys {
  [key: string]: string;
}

interface FoodProps extends Food, ObjectKeys {}

const { confirm } = Modal;

const FoodsTable: React.FC = () => {
  const { foodsFiltered, loadingFoodsRequest } = useSelector(
    (state: any) => state.food,
  );

  const showConfirmDeleteFood = (item: any) => {
    confirm({
      title: 'Tem certeza que deseja excluir esse sensor?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cuidado! Essa ação não pode ser desfeita.',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        dispatch(deleteFoodRequest({ food_id: item?._id }));
      },
      onCancel() {},
    });
  };

  const columns: ColumnsType<FoodProps> = [
    {
      title: 'Nome',
      width: 100,
      dataIndex: 'food_name',
      key: 'food_name',
      fixed: 'left',
      align: 'center',
      sorter: (a: FoodProps, b: FoodProps) =>
        a.food_name.localeCompare(b.food_name),
    },
    {
      title: 'Categoria',
      width: 100,
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      sorter: (a: FoodProps, b: FoodProps) =>
        a.category.localeCompare(b.category),
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
            <a
              onClick={() => showConfirmDeleteFood(item)}
              style={{ fontSize: '18px', marginLeft: 5, color: '#ff2000' }}
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
    dispatch(getFoodsRequest());
  }, []);

  return (
    <Table
      loading={loadingFoodsRequest}
      className="components-table-demo-nested"
      columns={columns}
      dataSource={foodsFiltered}
      scroll={{ x: true }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '25', '50', '100'],
      }}
    />
  );
};

export default FoodsTable;
