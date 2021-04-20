import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { MyProductionsContext } from '../../MyProductions';
import CreateForm from './CreateForm';
import CreateResult from './CreateResult';

export const CreateProductionContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const CreateModal: React.FC = () => {
  const { visibleCreateModal, setVisibleCreateModal } = useContext(
    MyProductionsContext,
  );

  const [result, setResult] = useState<boolean>(false);

  const { loadingCreateProductionRequest } = useSelector(
    (state: any) => state.production,
  );

  return (
    <CreateProductionContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleCreateModal}
        title={`Criar Produção`}
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
            loadingCreateProductionRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <CreateResult />
            ),
          ]
        )}
      </Modal>
    </CreateProductionContext.Provider>
  );
};

export default CreateModal;
