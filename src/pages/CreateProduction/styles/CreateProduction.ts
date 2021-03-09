import styled from 'styled-components/macro';
import { Button, Select, Form, Input } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

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

export const ContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
`;

export const MinusCircleOutlinedStyled = styled(MinusCircleOutlined)`
  margin-left: 10px;
  margin-right: 5px;
`;

export const ItemStyled = styled(Item)`
  margin-bottom: 15px;
`;

export const InputStyled = styled(Input)`
  width: 300px;
`;
