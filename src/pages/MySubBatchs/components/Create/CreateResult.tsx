import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { CreateSubBatchContext } from './CreateModal';
import { MySubBatchsContext } from '../../MySubBatchs';

const CreateResultSubBatch: React.FC = () => {
  const { error } = useSelector((state: any) => state.subbatch);

  const { setVisibleCreateModal } = useContext(MySubBatchsContext);

  const { result, setResult } = useContext(CreateSubBatchContext);

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
            subTitle="Seu sublote foi criado com sucesso."
            extra={[
              <Button
                key="btn-create"
                type="primary"
                onClick={() => setResult(false)}
                style={{ marginBottom: 5 }}
              >
                Criar outro sublote
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

export default CreateResultSubBatch;
