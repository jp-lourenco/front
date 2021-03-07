import styled from 'styled-components/macro';
import { Button, Select, Form } from 'antd';

const { Item } = Form;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonStyled = styled(Button)`
  width: 300px;
`;

export const SelectStyled = styled(Select)`
  width: 300px;
`;

export const FormStyled = styled(Form)``;

export const ItemStyled = styled(Item)`
  margin-bottom: 15px;
`;
