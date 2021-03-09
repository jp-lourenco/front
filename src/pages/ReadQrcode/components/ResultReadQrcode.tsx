import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { ReadQrcodeContext } from '../ReadQrcode';

const ResultReadQrcode: React.FC = () => {
  const { error, message } = useSelector((state: any) => state.batch);

  const { result, setResult, setCameraEnabled } = useContext(ReadQrcodeContext);

  const handleResult = (type: string) => {
    if (type === 'novamente') {
      setResult(false);
      setCameraEnabled(true);
    } else {
      setResult(false);
    }
  };

  return (
    <>
      {error && result == true ? (
        <Result
          key="error"
          status="error"
          title="Erro!"
          subTitle={`${message?.toString()}`}
          extra={[
            <Button
              key="voltar"
              type="primary"
              onClick={() => handleResult('voltar')}
            >
              Voltar
            </Button>,
            <Button key="novamente" onClick={() => handleResult('novamente')}>
              Entregar/Receber novamente
            </Button>,
          ]}
        />
      ) : (
        <Result
          key="sucesso"
          status="success"
          title="Sucesso!"
          subTitle="Obrigado por contribuir com a rastreabilidade."
          extra={[
            <Button
              key="voltar"
              type="primary"
              onClick={() => handleResult('voltar')}
            >
              Voltar
            </Button>,
            <Button key="novamente" onClick={() => handleResult('novamente')}>
              Entregar/Receber novamente
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default ResultReadQrcode;
