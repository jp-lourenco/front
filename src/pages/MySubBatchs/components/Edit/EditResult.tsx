import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { EditSubBatchContext } from './EditModal';
import { MySubBatchsContext } from '../../MySubBatchs';

const EditResultProduction: React.FC = () => {
  const { error } = useSelector((state: any) => state.subbatch);

  const { setVisibleEditModal } = useContext(MySubBatchsContext);

  const { result, setResult } = useContext(EditSubBatchContext);

  const handleCancel = () => {
    setVisibleEditModal(false);
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
              <Button key="bt" type="primary" onClick={() => handleCancel()}>
                Finalizar
              </Button>,
            ]}
          />
        ) : (
          <Result
            key="sucesso"
            status="success"
            title="Sucesso!"
            subTitle="Sua informação foi adicionada com sucesso."
            extra={[
              <Button key="btn" type="primary" onClick={() => handleCancel()}>
                Finalizar
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

export default EditResultProduction;
