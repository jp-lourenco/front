import React, { useContext } from 'react';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import {
  Container,
  Header,
  Title,
  QrReaderStyled,
  ButtonCancelarStyled,
} from './styles/ReadQrcodeClient';
import { Link } from 'react-router-dom';

const ReadQrcodeClient: React.FC = () => {
  const dispatch = useDispatch();

  const handleScan = (data: string | null) => {};

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
      <Header>
        <Title>BioTRACE</Title>
      </Header>
      <Container>
        <QrReaderStyled
          delay={10}
          onError={handleError}
          onScan={handleScan}
          facingMode="environment"
        />
        <ButtonCancelarStyled type="primary" onClick={() => {}}>
          <Link to="/">CANCELAR</Link>
        </ButtonCancelarStyled>
      </Container>
    </>
  );
};

export default ReadQrcodeClient;
