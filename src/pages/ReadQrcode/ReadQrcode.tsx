import React, { useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Container } from './styles/ReadQrcode';
import Camera from './components/Camera';
import ResultReadQrcode from './components/ResultReadQrcode';

export const ReadQrcodeContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
  isCameraEnabled: false,
  setCameraEnabled: (isCameraEnabled: boolean) => {},
});

const ReadQrcode: React.FC = () => {
  const [isCameraEnabled, setCameraEnabled] = useState(false);
  const [result, setResult] = useState(false);

  const { loadingReadQrcodeRequest } = useSelector((state: any) => state.batch);

  return (
    <ReadQrcodeContext.Provider
      value={{ result, setResult, isCameraEnabled, setCameraEnabled }}
    >
      <Container>
        {result == false ? (
          <Camera />
        ) : (
          [
            loadingReadQrcodeRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <ResultReadQrcode />
            ),
          ]
        )}
      </Container>
    </ReadQrcodeContext.Provider>
  );
};

export default ReadQrcode;
