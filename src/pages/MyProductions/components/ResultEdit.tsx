import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { EditProductionContext } from './EditModal';
import { MyProductionsContext } from '../MyProductions';

const ResultEditProduction: React.FC = () => {
  const { error } = useSelector((state: any) => state.production);

  const { setVisibleEditModal } = useContext(MyProductionsContext);

  const { result, setResult } = useContext(EditProductionContext);

  const handleCancel = () => {
    setVisibleEditModal(false);
    setResult(false);
  };

  return (
    <>
      {error && result == true ? (
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
};

export default ResultEditProduction;
