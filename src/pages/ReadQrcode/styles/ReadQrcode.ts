import styled from 'styled-components/macro';
import { Button } from 'antd';
import QrReader from 'react-qr-reader';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonStyled = styled(Button)``;

export const ButtonCancelarStyled = styled(Button)`
  border-radius: 3px;
  margin-top: 15px;
`;

export const Text = styled.p`
  color: #000;
  font-size: 18px;
  font-weight: bold;
`;

export const QrReaderStyled = styled(QrReader)`
  width: 500px;

  @media (max-width: 600px) {
    width: 330px;
  }
`;
