import React, { createContext, useContext, useState } from 'react';
import { Modal } from 'antd';
import { MySubBatchsContext } from '../../MySubBatchs';
import EditForm from './EditForm';
import { LoadingOutlined } from '@ant-design/icons';
import EditResult from './EditResult';
import { useSelector } from 'react-redux';

export const EditSubBatchContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const EditModal: React.FC = () => {
  const { visibleEditModal, setVisibleEditModal } =
    useContext(MySubBatchsContext);

  const [result, setResult] = useState<boolean>(false);

  const { loadingEditSubBatchRequest } = useSelector(
    (state: any) => state.subbatch,
  );

  return (
    <EditSubBatchContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleEditModal}
        title={`Gerir Informação`}
        onOk={() => setVisibleEditModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <EditForm />
        ) : (
          [
            loadingEditSubBatchRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <EditResult />
            ),
          ]
        )}
      </Modal>
    </EditSubBatchContext.Provider>
  );
};

export default EditModal;
