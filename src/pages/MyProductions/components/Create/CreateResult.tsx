import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { CreateProductionContext } from './CreateModal';
import { MyProductionsContext } from '../../MyProductions';

const CreateResultProduction: React.FC = () => {
  const { error } = useSelector((state: any) => state.production);

  const { setVisibleCreateModal } = useContext(MyProductionsContext);

  const { result, setResult } = useContext(CreateProductionContext);

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
            subTitle="Sua produção foi criada com sucesso."
            extra={[
              <Button
                key="btn-create"
                type="primary"
                onClick={() => setResult(false)}
                style={{ marginBottom: 5 }}
              >
                Criar outra produção
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

export default CreateResultProduction;
