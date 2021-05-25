import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { CreateFoodContext } from './CreateFoodModal';
import { FoodsContext } from '../../Foods';

const CreateFoodResult: React.FC = () => {
  const { error } = useSelector((state: any) => state.sensor);

  const { setVisibleCreateModal } = useContext(FoodsContext);

  const { result, setResult } = useContext(CreateFoodContext);

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
            subTitle="Food registado com sucesso."
            extra={[
              <Button
                key="btn-create"
                type="primary"
                onClick={() => setResult(false)}
                style={{ marginBottom: 5 }}
              >
                Registar outro alimento
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

export default CreateFoodResult;
