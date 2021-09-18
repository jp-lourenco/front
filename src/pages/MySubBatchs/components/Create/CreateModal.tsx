import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { MySubBatchsContext } from '../../MySubBatchs';
import CreateForm from './CreateForm';
import CreateResult from './CreateResult';

export const CreateSubBatchContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const CreateModal: React.FC = () => {
  const { visibleCreateModal, setVisibleCreateModal } =
    useContext(MySubBatchsContext);

  const [result, setResult] = useState<boolean>(false);

  const { loadingCreateSubBatchRequest } = useSelector(
    (state: any) => state.subbatch,
  );

  return (
    <CreateSubBatchContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleCreateModal}
        title={`Criar Sublote`}
        onOk={() => setVisibleCreateModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <CreateForm />
        ) : (
          [
            loadingCreateSubBatchRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <CreateResult />
            ),
          ]
        )}
      </Modal>
    </CreateSubBatchContext.Provider>
  );
};

export default CreateModal;
