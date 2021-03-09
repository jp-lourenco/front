import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { CreateProductionContext } from '../CreateProduction';

const ResultCreateProduction: React.FC = () => {
  const { error } = useSelector((state: any) => state.production);

  const { result, setResult } = useContext(CreateProductionContext);

  return (
    <>
      {error && result == true ? (
        <Result
          key="error"
          status="error"
          title="Erro!"
          subTitle="Alguma coisa deu errado."
          extra={[
            <Button key="novamente" onClick={() => setResult(false)}>
              Criar outra produção
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
            <Button key="btn" onClick={() => setResult(false)}>
              Criar outra produção
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default ResultCreateProduction;
