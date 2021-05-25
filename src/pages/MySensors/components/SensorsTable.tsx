import React, { useEffect } from 'react';
import { Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  syncSensorRequest,
  deleteSensorRequest,
  getSensorsRequest,
} from '../../../store/modules/sensor/actions';
import { ColumnsType } from 'antd/lib/table';
import { Sensor } from '../../../store/modules/sensor/types';
import {
  DeleteOutlined,
  CloudSyncOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import 'moment/locale/pt-br';
import moment from 'moment';

interface ObjectKeys {
  [key: string]: string;
}

interface SensorProps extends Sensor, ObjectKeys {}

const { confirm } = Modal;

const SensorsTable: React.FC = () => {
  const { mySensorsFiltered, loadingGetSensorsRequest } = useSelector(
    (state: any) => state.sensor,
  );

  const showConfirmDeleteSensor = (item: any) => {
    confirm({
      title: 'Tem certeza que deseja excluir esse sensor?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cuidado! Essa ação não pode ser desfeita.',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        dispatch(deleteSensorRequest({ sensor_id: item?._id }));
      },
      onCancel() {},
    });
  };

  const showConfirmSyncSensor = (item: any) => {
    confirm({
      title: 'Tem certeza que deseja sincronizar esse sensor?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cuidado! Essa ação não pode ser desfeita.',
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        dispatch(syncSensorRequest({ sensor_id: item?._id }));
      },
      onCancel() {},
    });
  };

  const columns: ColumnsType<SensorProps> = [
    {
      title: 'Identificador',
      width: 100,
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      align: 'center',
      sorter: (a: SensorProps, b: SensorProps) => a.name.localeCompare(b.name),
    },
    {
      title: 'Data da sincronização',
      width: 100,
      dataIndex: 'synced',
      key: 'synced',
      align: 'center',
      render: (dataIndex: any) => {
        return (
          <span>
            <p>{moment(dataIndex).format('llll')}</p>
          </span>
        );
      },
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
            <a onClick={() => showConfirmSyncSensor(item)}>
              <CloudSyncOutlined style={{ fontSize: '20px', color: '#08c' }} />
            </a>

            <a
              onClick={() => showConfirmDeleteSensor(item)}
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
    dispatch(getSensorsRequest());
  }, []);

  return (
    <Table
      loading={loadingGetSensorsRequest}
      className="components-table-demo-nested"
      columns={columns}
      dataSource={mySensorsFiltered}
      scroll={{ x: true }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '25', '50', '100'],
      }}
    />
  );
};

export default SensorsTable;
