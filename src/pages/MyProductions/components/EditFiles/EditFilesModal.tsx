import React, { createContext, useContext } from 'react';
import { Modal } from 'antd';
import { MyProductionsContext } from '../../MyProductions';
import EditFiles from './EditImages';
import {
  ModalFilesStyled,
  TabPaneStyled,
  TabsStyled,
} from '../../styles/MyProductions';
import EditImages from './EditImages';
import EditVideos from './EditVideos';

export const EditFilesProductionContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const EditFilesModal: React.FC = () => {
  const { visibleEditFilesModal, setVisibleEditFilesModal } = useContext(
    MyProductionsContext,
  );

  return (
    <ModalFilesStyled
      visible={visibleEditFilesModal}
      title={`Media`}
      onOk={() => setVisibleEditFilesModal(false)}
      onCancel={() => setVisibleEditFilesModal(false)}
      closable={false}
      footer={false}
      width={350}
    >
      <TabsStyled defaultActiveKey="1">
        <TabPaneStyled tab={<span>Imagens</span>} key="1">
          <EditImages />
        </TabPaneStyled>
        <TabPaneStyled tab={<span>Vídeos</span>} key="2">
          <EditVideos />
        </TabPaneStyled>
      </TabsStyled>
    </ModalFilesStyled>
  );
};

export default EditFilesModal;
