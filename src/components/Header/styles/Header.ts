import styled from 'styled-components/macro';
import { Layout, Drawer, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

export const HeaderStyled = styled(Header)`
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  @media (max-width: 992px) {
    display: none;
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

  @media (max-width: 992px) {
    display: none;
  }
`;

export const MenuOutlinedStyled = styled(MenuOutlined)`
  padding: 18px 24px;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
  @media (min-width: 992px) {
    display: none;
  }
`;

export const AvatarStyled = styled(Avatar)`
  color: #fff;
  cursor: pointer;
  transition: color 0.3s;
  margin: 0 24px;

  &:hover {
    color: #1890ff;
  }
`;

export const DrawerStyled = styled(Drawer)`
  .ant-drawer-header {
    background-color: #001529;
    border: 0;
    border-radius: 0;
  }

  .ant-drawer-title {
    color: #fff;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
  }

  .ant-drawer-close {
    color: #fff;
  }

  .ant-drawer-body {
    background-color: #001529;
    padding: 0;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;
