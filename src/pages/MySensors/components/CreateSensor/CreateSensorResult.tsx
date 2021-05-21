import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { CreateSensorContext } from './CreateSensorModal';
import { MySensorsContext } from '../../MySensors';

const CreateSensorResult: React.FC = () => {
  const { error } = useSelector((state: any) => state.sensor);

  const { setVisibleCreateModal } = useContext(MySensorsContext);

  const { result, setResult } = useContext(CreateSensorContext);

  const handleCancel = () => {
    setVisibleCreateModal(false);
    setResult(false);
  };

  if (result === true) {
    return (
      <>
        {error && result === true ? (
          <Result
            key="error"
            status="error"
            title="Erro!"
            subTitle="Alguma coisa deu errado."
            extra={[
              <Button
                key="btn-create"
                type="primary"
                onClick={() => setResult(false)}
                style={{ marginBottom: 5 }}
              >
                Tentar novamente
              </Button>,
              <Button
                key="btn-final"
                type="primary"
                onClick={() => handleCancel()}
              >
                Finalizar
              </Button>,
            ]}
          />
        ) : (
          <Result
            key="sucesso"
            status="success"
            title="Sucesso!"
            subTitle="Sensor registado com sucesso."
            extra={[
              <Button
                key="btn-create"
                type="primary"
                onClick={() => setResult(false)}
                style={{ marginBottom: 5 }}
              >
                Registar outro sensor
              </Button>,
              <Button key="btn-cancel" onClick={() => handleCancel()}>
                Cancelar
              </Button>,
            ]}
          />
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default CreateSensorResult;
