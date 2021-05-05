import React, { createContext, useContext, useState } from 'react';
import { Modal } from 'antd';
import { MyProductionsContext } from '../../MyProductions';
import EditBatchForm from './EditBatchForm';
import { LoadingOutlined } from '@ant-design/icons';
import EditBatchResult from './EditBatchResult';
import { useSelector } from 'react-redux';

export const EditBatchContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const EditBatchModal: React.FC = () => {
  const { visibleEditBatchModal, setVisibleEditBatchModal } = useContext(
    MyProductionsContext,
  );

  const [result, setResult] = useState<boolean>(false);

  const { loadingEditBatchRequest } = useSelector((state: any) => state.batch);

  return (
    <EditBatchContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleEditBatchModal}
        title={`Gerir Informação`}
        onOk={() => setVisibleEditBatchModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <EditBatchForm />
        ) : (
          [
            loadingEditBatchRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <EditBatchResult />
            ),
          ]
        )}
      </Modal>
    </EditBatchContext.Provider>
  );
};

export default EditBatchModal;
