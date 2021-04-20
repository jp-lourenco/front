import styled from 'styled-components/macro';
import Search from 'antd/lib/input/Search';
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

export const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LinkDropdownStyled = styled.a`
  margin: 0 3px 10px 0px;

  @media (max-width: 425px) {
    font-size: 14px;
  }

  @media (max-width: 367px) {
    font-size: 12px;
  }
`;

export const Label = styled.p`
  background-color: #1890ff;
  border-radius: 15px;
  padding: 2px 6px;
  font-size: 12px;
  margin: 0 10px 10px 0px;
  color: #fff;

  @media (max-width: 430px) {
    font-size: 10px;
    margin: 0 5px 10px 0px;
  }
`;

export const SearchStyled = styled(Search)`
  width: 250px;
  margin-bottom: 10px;

  @media (max-width: 462px) {
    width: 180px;
  }

  @media (max-width: 350px) {
    width: 140px;
  }
`;

export const ButtonRefresh = styled(Button)`
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const ButtonAdd = styled(Button)`
  margin-bottom: 10px;
  margin-left: 5px;
  margin-left: auto;

  @media (max-width: 374px) {
    display: none;
  }
`;

export const ButtonIconAdd = styled(Button)`
  margin-bottom: 10px;
  margin-left: 5px;
  display: none;

  @media (max-width: 374px) {
    display: block;
  }
`;
