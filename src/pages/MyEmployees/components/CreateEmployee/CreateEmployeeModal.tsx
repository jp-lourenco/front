import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { MyEmployeesContext } from '../../MyEmployees';
import CreateEmployeeForm from './CreateEmployeeForm';
import CreateEmployeeResult from './CreateEmployeeResult';

export const CreateEmployeeContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const CreateEmployeeModal: React.FC = () => {
  const { visibleCreateModal, setVisibleCreateModal } = useContext(
    MyEmployeesContext,
  );

  const [result, setResult] = useState<boolean>(false);

  const { loadingCreateEmployeeRequest } = useSelector(
    (state: any) => state.employee,
  );

  return (
    <CreateEmployeeContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleCreateModal}
        title={`Registar Funcionário`}
        onOk={() => setVisibleCreateModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <CreateEmployeeForm />
        ) : (
          [
            loadingCreateEmployeeRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <CreateEmployeeResult />
            ),
          ]
        )}
      </Modal>
    </CreateEmployeeContext.Provider>
  );
};

export default CreateEmployeeModal;
