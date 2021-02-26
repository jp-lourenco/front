import styled from 'styled-components/macro';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

export const HeaderStyled = styled(Header)`
  padding: 0;
`;

export const MenuUnfoldOutlinedStyled = styled(MenuUnfoldOutlined)`
  padding: 18px 24px;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
`;

export const MenuFoldOutlinedStyled = styled(MenuFoldOutlined)`
  padding: 18px 24px;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
`;
