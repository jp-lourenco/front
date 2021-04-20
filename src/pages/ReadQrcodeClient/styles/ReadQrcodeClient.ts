import styled from 'styled-components/macro';
import { Button } from 'antd';
import QrReader from 'react-qr-reader';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 70px);
`;

export const Header = styled.div`
  display: flex;
  height: 70px;
  background: #446800;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 27px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

export const ButtonCancelarStyled = styled(Button)`
  margin-top: 15px;
  width: 200px;
  height: 45px;
  background: #ec0000;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  border: none;

  &:selection {
    background: #ff0000;
  }
`;

export const QrReaderStyled = styled(QrReader)`
  width: 500px;

  @media (max-width: 600px) {
    width: 400px;
  }
  @media (max-width: 450px) {
    width: 330px;
  }
`;
