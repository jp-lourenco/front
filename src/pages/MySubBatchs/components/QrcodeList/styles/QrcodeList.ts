import React from 'react';
import styled from 'styled-components/macro';
import QRCode from 'qrcode.react';

interface ContainerProps {
  selectedRowKeys: React.Key[];
}

export const Container = styled.div<ContainerProps>`
  display: ${(props) => (props.selectedRowKeys.length > 0 ? 'block' : 'none')};
`;

export const ContainerList = styled.div`
  padding: 20px 10px 0px 10px;
  background: #fff;
`;

export const TitleList = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-right: 10px;
  color: #000;
`;

export const CodeItem = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

export const QRCodeStyled = styled(QRCode)``;

export const ContainerItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
