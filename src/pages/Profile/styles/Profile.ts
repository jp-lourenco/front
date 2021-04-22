import styled from 'styled-components/macro';
import { Form, Input, Button } from 'antd';

const { Item } = Form;

export const Container = styled.div`
  height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormStyled = styled(Form)``;

export const ItemStyled = styled(Item)`
  margin-bottom: 15px;
`;

export const InputStyled = styled(Input)`
  width: 300px;

  @media (max-width: 374px) {
    width: 250px;
  }
`;

export const ButtonStyled = styled(Button)`
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
