import styled from 'styled-components/macro';
import { Button, Checkbox } from 'antd';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ForgotPasswordStyled = styled(Button)`
  padding: 0px;
  margin: 0px;
`;

export const CheckboxStyled = styled(Checkbox)``;

export const Image = styled.img`
  width: 300px;
  margin-bottom: 50px;
`;
