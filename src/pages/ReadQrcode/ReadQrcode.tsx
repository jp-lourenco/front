import { Button, message, notification, Result } from 'antd';
import React, { useState } from 'react';
import {
  Container,
  ButtonStyled,
  QrReaderStyled,
  ButtonCancelarStyled,
} from './styles/ReadQrcode';

const ReadQrcode: React.FC = () => {
  const [isCameraEnabled, setCameraEnabled] = useState(false);
  const [result, setResult] = useState('');
  const [isCameraSupported, setCameraSupported] = useState(false);

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(data);
      setCameraEnabled(false);
    }
  };

  const handleError = (err: any) => {
    const args = {
      message: 'Erro',
      description: err.toString(),
      duration: 0,
    };
    notification.open(args);
  };

  const handleResult = (type: string) => {
    if (type === 'novamente') {
      setResult('');
      setCameraEnabled(true);
    } else {
      setResult('');
    }
  };

  return (
    <Container>
      {isCameraEnabled && result == '' ? (
        <>
          <QrReaderStyled
            delay={10}
            onError={handleError}
            onScan={handleScan}
            facingMode="environment"
          />
          <ButtonCancelarStyled
            type="primary"
            onClick={() => setCameraEnabled(false)}
          >
            Cancelar
          </ButtonCancelarStyled>
        </>
      ) : (
        [
          !isCameraEnabled && result == '' ? (
            <ButtonStyled type="primary" onClick={() => setCameraEnabled(true)}>
              Entregar/Receber lote
            </ButtonStyled>
          ) : (
            <Result
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
                <Button
                  key="novamente"
                  onClick={() => handleResult('novamente')}
                >
                  Entregar/Receber novamente
                </Button>,
              ]}
            />
          ),
        ]
      )}
    </Container>
  );
};

export default ReadQrcode;
