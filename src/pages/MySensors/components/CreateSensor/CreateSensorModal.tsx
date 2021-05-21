import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { MySensorsContext } from '../../MySensors';
import CreateSensorForm from './CreateSensorForm';
import CreateSensorResult from './CreateSensorResult';

export const CreateSensorContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const CreateSensorModal: React.FC = () => {
  const { visibleCreateModal, setVisibleCreateModal } = useContext(
    MySensorsContext,
  );

  const [result, setResult] = useState<boolean>(false);

  const { loadingCreateSensorRequest } = useSelector(
    (state: any) => state.sensor,
  );

  return (
    <CreateSensorContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleCreateModal}
        title={`Registar Funcionário`}
        onOk={() => setVisibleCreateModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <CreateSensorForm />
        ) : (
          [
            loadingCreateSensorRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <CreateSensorResult />
            ),
          ]
        )}
      </Modal>
    </CreateSensorContext.Provider>
  );
};

export default CreateSensorModal;
