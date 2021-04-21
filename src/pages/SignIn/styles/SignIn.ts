import styled from 'styled-components/macro';
import { Button, Select, Form, Checkbox, Input } from 'antd';

const { Item } = Form;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonStyled = styled(Button)`
  width: 300px;

  @media (max-width: 374px) {
    width: 250px;
  }
`;

export const ForgotPasswordStyled = styled(Button)`
  padding: 0px;
  margin: 0px;
`;

export const SelectStyled = styled(Select)`
  width: 300px;
`;

export const Text = styled.p`
  font-size: 13px;
  color: #888;
`;

export const List = styled.ul`
  margin-bottom: 15px;
`;

export const ListItem = styled.li`
  margin-bottom: 8px;
`;

export const CheckboxStyled = styled(Checkbox)``;

export const InputStyled = styled(Input)``;

export const FormStyled = styled(Form)``;

export const ItemStyled = styled(Item)`
  margin-bottom: 15px;
`;
