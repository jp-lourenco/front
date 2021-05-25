import React, { useContext, useState } from 'react';
import { Button, Table, Timeline } from 'antd';
import { MyProductionsContext } from '../MyProductions';
import {
  LabelSensor,
  ModalStyled,
  Text,
  ValueSensor,
} from '../styles/MyProductions';
import { History } from '../../../store/modules/production/types';
import 'moment/locale/pt-br';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';

const TraceModal: React.FC = () => {
  const [visibleValuesModal, setVisibleValuesModal] = useState(false);

  const [historySelected, setHistorySelected] = useState<History>();

  const { batchSelected, visibleTraceModal, setVisibleTraceModal } =
    useContext(MyProductionsContext);

  const columns: ColumnsType<any> = [
    {
      title: 'Temperatura',
      width: 100,
      dataIndex: 'payload',
      key: 'payload',
      align: 'center',
      sorter: (a: any, b: any) => {
        return a.payload.temperature - b.payload.temperature;
      },
      render: (dataIndex: any) => {
        return (
          <span>
            <p>{dataIndex.temperature}</p>
          </span>
        );
      },
    },
    {
      title: 'Humidade',
      width: 100,
      dataIndex: 'payload',
      key: 'payload',
      align: 'center',
      sorter: (a: any, b: any) => {
        return a.payload.humidity - b.payload.humidity;
      },
      render: (dataIndex: any) => {
        return (
          <span>
            <p>{dataIndex.humidity}</p>
          </span>
        );
      },
    },
    {
      title: 'Data',
      width: 100,
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      render: (dataIndex: any) => {
        return (
          <span>
            <p>{moment(dataIndex).format('llll')}</p>
          </span>
        );
      },
    },
  ];

  const ModalValues = () => {
    return (
      <ModalStyled
        visible={visibleValuesModal}
        title={'Sensores'}
        onOk={() => setVisibleValuesModal(false)}
        onCancel={() => setVisibleValuesModal(false)}
        footer={null}
        width={650}
        style={{
          padding: 0,
          paddingTop: 24,
          paddingRight: 24,
          paddingLeft: 24,
        }}
      >
        <Table
          className="components-table-demo-nested"
          columns={columns}
          scroll={{ x: true }}
          dataSource={historySelected?.values_sensor}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '25', '50', '100'],
          }}
        />
        {historySelected?.values_sensor?.map((value) => {
          <p>{value.payload.temperature}</p>;
        })}
      </ModalStyled>
    );
  };

  const showModalValues = (item: History) => {
    setHistorySelected(item);
    setVisibleValuesModal(true);
  };

  return (
    <ModalStyled
      visible={visibleTraceModal}
      title={`Rastreabilidade - ${
        batchSelected ? batchSelected['batch_code'] : ''
      }`}
      onOk={() => setVisibleTraceModal(false)}
      width={650}
      onCancel={() => setVisibleTraceModal(false)}
      footer={null}
      style={{ padding: 0, paddingTop: 24, paddingRight: 24, paddingLeft: 24 }}
    >
      {batchSelected ? (
        batchSelected['history'] ? (
          <Timeline>
            <ModalValues />
            {batchSelected['history'].map((item: History, index: number) => {
              if (item.transition.includes('tentou')) {
                return (
                  <Timeline.Item color="red" key={index}>
                    Erro: {item.transition} - {moment(item.date).format('llll')}
                  </Timeline.Item>
                );
              } else if (item.transition !== 'Lojista recebeu') {
                return (
                  <>
                    <Timeline.Item key={index}>
                      {item.transition} - {moment(item.date).format('llll')}
                      {item?.max_value_temp &&
                        item?.min_value_temp &&
                        item?.average_value_temp && (
                          <>
                            <LabelSensor>
                              Temperatura:{' '}
                              <Button
                                onClick={() => showModalValues(item)}
                                shape="circle"
                                icon={<PlusOutlined />}
                                size="small"
                              />
                            </LabelSensor>
                            <ValueSensor>
                              Min: {item.min_value_temp}°C - Max:{' '}
                              {item.max_value_temp}°C
                            </ValueSensor>

                            <ValueSensor>
                              Média: {item.average_value_temp}°C
                            </ValueSensor>
                          </>
                        )}
                      {item?.max_value_humi &&
                        item?.min_value_humi &&
                        item?.average_value_humi && (
                          <>
                            <LabelSensor>Humidade: </LabelSensor>
                            <ValueSensor>
                              Min: {item.min_value_humi}% - Max:{' '}
                              {item.max_value_humi}%
                            </ValueSensor>

                            <ValueSensor>
                              {item.average_value_humi}%
                            </ValueSensor>
                          </>
                        )}
                    </Timeline.Item>
                  </>
                );
              } else {
                return (
                  <Timeline.Item color="green" key={index}>
                    {item.transition} - {moment(item.date).format('llll')}{' '}
                  </Timeline.Item>
                );
              }
            })}
          </Timeline>
        ) : (
          <Text>Esse lote ainda não avançou na cadeia agro alimentar</Text>
        )
      ) : (
        ''
      )}
    </ModalStyled>
  );
};

export default TraceModal;
