import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FoodsContext } from '../../Foods';
import CreateFoodForm from './CreateFoodForm';
import CreateFoodResult from './CreateFoodResult';

export const CreateFoodContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const CreateFoodModal: React.FC = () => {
  const { visibleCreateModal, setVisibleCreateModal } =
    useContext(FoodsContext);

  const [result, setResult] = useState<boolean>(false);

  const { loadingCreateFoodRequest } = useSelector(
    (state: any) => state.sensor,
  );

  return (
    <CreateFoodContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleCreateModal}
        title={`Registar Alimento`}
        onOk={() => setVisibleCreateModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <CreateFoodForm />
        ) : (
          [
            loadingCreateFoodRequest ? (
              <LoadingOutlined
                style={{ fontSize: 24 }}
                spin
                key={'loading-create-food-modal'}
              />
            ) : (
              <CreateFoodResult key={'result-create-food-modal'} />
            ),
          ]
        )}
      </Modal>
    </CreateFoodContext.Provider>
  );
};

export default CreateFoodModal;
