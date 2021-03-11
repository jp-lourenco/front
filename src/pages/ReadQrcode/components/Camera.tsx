import React, { useContext } from 'react';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import {
  ButtonStyled,
  QrReaderStyled,
  ButtonCancelarStyled,
} from '../styles/ReadQrcode';
import { readQrcodeRequest } from '../../../store/modules/batch/actions';
import { ReadQrcodeContext } from '../ReadQrcode';

const Camera: React.FC = () => {
  const { setResult, isCameraEnabled, setCameraEnabled } = useContext(
    ReadQrcodeContext,
  );

  const dispatch = useDispatch();

  const handleScan = (data: string | null) => {
    if (data) {
      setResult(true);
      setCameraEnabled(false);
      dispatch(readQrcodeRequest({ qrcode: data }));
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

  return (
    <>
      {isCameraEnabled ? (
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
        <ButtonStyled
          key="button"
          type="primary"
          onClick={() => setCameraEnabled(true)}
        >
          Entregar/Receber lote
        </ButtonStyled>
      )}
    </>
  );
};

export default Camera;
