import React, { useContext } from 'react';
import { Timeline } from 'antd';
import { MyProductionsContext } from '../MyProductions';
import { ModalStyled, Text } from '../styles/MyProductions';
import { History } from '../../../store/modules/production/types';
import 'moment/locale/pt-br';
import moment from 'moment';

const TraceModal: React.FC = () => {
  const { batchSelected, visibleTraceModal, setVisibleTraceModal } = useContext(
    MyProductionsContext,
  );

  return (
    <ModalStyled
      visible={visibleTraceModal}
      title={`Rastreabilidade - ${
        batchSelected ? batchSelected['batch_code'] : ''
      }`}
      onOk={() => setVisibleTraceModal(false)}
      onCancel={() => setVisibleTraceModal(false)}
      footer={null}
      style={{ padding: 0, paddingTop: 24, paddingRight: 24, paddingLeft: 24 }}
    >
      {batchSelected ? (
        batchSelected['history'] ? (
          <Timeline>
            {batchSelected['history'].map((item: History, index: number) => {
              if (item.transition.includes('tentou')) {
                return (
                  <Timeline.Item color="red" key={index}>
                    Erro: {item.transition} - {moment(item.date).format('llll')}
                  </Timeline.Item>
                );
              } else if (item.transition !== 'Lojista recebeu') {
                return (
                  <Timeline.Item key={index}>
                    {item.transition} - {moment(item.date).format('llll')}
                  </Timeline.Item>
                );
              } else {
                return (
                  <Timeline.Item color="green" key={index}>
                    {item.transition} - {moment(item.date).format('llll')}
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
