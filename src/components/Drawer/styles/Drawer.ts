import styled from 'styled-components/macro';
import { Menu } from 'antd';

const { Item } = Menu;

export const MenuStyled = styled(Menu)`
  margin-top: 30px;
`;

export const MenuItemStyled = styled(Item)`
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
  padding: 0;

  &.ant-menu-item-selected {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.2px;
  }
`;
