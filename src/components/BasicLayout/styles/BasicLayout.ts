import styled from 'styled-components/macro';
import { Layout } from 'antd';

const { Content } = Layout;

export const ContentStyled = styled(Content)`
  min-height: calc(100vh - 96px);
  padding: 1rem;
`;
