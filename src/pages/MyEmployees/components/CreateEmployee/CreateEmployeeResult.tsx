import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { CreateEmployeeContext } from './CreateEmployeeModal';
import { MyEmployeesContext } from '../../MyEmployees';

const CreateEmployeeResult: React.FC = () => {
  const { error } = useSelector((state: any) => state.employee);

  const { setVisibleCreateModal } = useContext(MyEmployeesContext);

  const { result, setResult } = useContext(CreateEmployeeContext);

  const handleCancel = () => {
    setVisibleCreateModal(false);
    setResult(false);
  };

  if (result === true) {
    return (
      <>
        {error && result === true ? (
          <Result
            key="error"
            status="error"
            title="Erro!"
            subTitle="Alguma coisa deu errado."
            extra={[
              <Button
                key="btn-create"
                type="primary"
                onClick={() => setResult(false)}
                style={{ marginBottom: 5 }}
              >
                Tentar novamente
              </Button>,
              <Button
                key="btn-final"
                type="primary"
                onClick={() => handleCancel()}
              >
                Finalizar
              </Button>,
            ]}
          />
        ) : (
          <Result
            key="sucesso"
            status="success"
            title="Sucesso!"
            subTitle="Funcionário registado com sucesso."
            extra={[
              <Button
                key="btn-create"
                type="primary"
                onClick={() => setResult(false)}
                style={{ marginBottom: 5 }}
              >
                Registar outro funcionário
              </Button>,
              <Button key="btn-cancel" onClick={() => handleCancel()}>
                Cancelar
              </Button>,
            ]}
          />
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default CreateEmployeeResult;
