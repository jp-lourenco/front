import styled from 'styled-components/macro';
import { Button, DatePicker, Modal, Tabs, Upload } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export const Text = styled.p`
  padding-bottom: 25px;
`;

export const ContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
`;

export const DatePickerStyled = styled(DatePicker)`
  width: 300px;

  @media (max-width: 374px) {
    width: 250px;
  }
`;

export const MinusCircleOutlinedStyled = styled(MinusCircleOutlined)`
  margin-left: 10px;
  margin-right: 5px;
`;

export const ModalStyled = styled(Modal)`
  .ant-modal-body {
    padding: 24px 24px 0px;
  }
  .ant-modal-content {
    margin-bottom: 10px;
  }
`;

export const LabelSensor = styled.p`
  font-weight: bold;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 0;
  margin: 0;
`;

export const ValueSensor = styled.p`
  margin: 0;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0;
  padding-bottom: 0;
`;

export const ButtonIconAdd = styled(Button)`
  margin-bottom: 10px;
  margin-left: 5px;
  display: none;

  @media (max-width: 374px) {
    display: block;
  }
`;

export const TabsStyled = styled(Tabs)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #363636;
`;

export const TabPaneStyled = styled(TabPane)`
  width: 250px !important;
`;
