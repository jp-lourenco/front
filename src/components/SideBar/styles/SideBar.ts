import styled from 'styled-components/macro';
import { Layout } from 'antd';

const { Sider } = Layout;

export const SiderStyled = styled(Sider)`
  min-height: 100vh;

  @media (max-width: 992px) {
    display: none;
  }
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

export const Image = styled.img`
  width: 180px;
  margin-top: 15px;
`;
