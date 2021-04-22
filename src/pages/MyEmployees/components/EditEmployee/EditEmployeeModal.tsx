import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { MyEmployeesContext } from '../../MyEmployees';
import EditEmployeeForm from './EditEmployeeForm';
import EditEmployeeResult from './EditEmployeeResult';

export const EditEmployeeContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const EditEmployeeModal: React.FC = () => {
  const { visibleEditModal, setVisibleEditModal } = useContext(
    MyEmployeesContext,
  );

  const [result, setResult] = useState<boolean>(false);

  const { loadingEditEmployeeRequest } = useSelector(
    (state: any) => state.employee,
  );

  return (
    <EditEmployeeContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleEditModal}
        title={`Editar Funcionário`}
        onOk={() => setVisibleEditModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <EditEmployeeForm />
        ) : (
          [
            loadingEditEmployeeRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <EditEmployeeResult />
            ),
          ]
        )}
      </Modal>
    </EditEmployeeContext.Provider>
  );
};

export default EditEmployeeModal;
