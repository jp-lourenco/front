import styled from 'styled-components/macro';
import { Layout } from 'antd';

const { Sider } = Layout;

export const SiderStyled = styled(Sider)`
  height: 100vh;
`;

export const Logo = styled.a`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
`;

export const ContainerLogo = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
