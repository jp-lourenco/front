import React, { createContext, useContext, useState } from 'react';
import { Button, Modal } from 'antd';
import { MyProductionsContext } from '../MyProductions';
import EditForm from './EditForm';
import { LoadingOutlined } from '@ant-design/icons';
import ResultEdit from './ResultEdit';
import { useDispatch, useSelector } from 'react-redux';
import { editProductionRequest } from '../../../store/modules/production/actions';

export const EditProductionContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const EditModal: React.FC = () => {
  const {
    productionSelected,
    visibleEditModal,
    setVisibleEditModal,
  } = useContext(MyProductionsContext);

  const [result, setResult] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { loadingEditProductionRequest } = useSelector(
    (state: any) => state.production,
  );

  return (
    <EditProductionContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleEditModal}
        title={`Adicionar Informação`}
        onOk={() => setVisibleEditModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result == false ? (
          <EditForm />
        ) : (
          [
            loadingEditProductionRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <ResultEdit />
            ),
          ]
        )}
      </Modal>
    </EditProductionContext.Provider>
  );
};

export default EditModal;
