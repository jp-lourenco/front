import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { EditEmployeeContext } from './EditEmployeeModal';
import { MyEmployeesContext } from '../../MyEmployees';

const EditResultProduction: React.FC = () => {
  const { errorEdit } = useSelector((state: any) => state.production);

  const { setVisibleEditModal } = useContext(MyEmployeesContext);

  const { result, setResult } = useContext(EditEmployeeContext);

  const handleCancel = () => {
    setVisibleEditModal(false);
    setResult(false);
  };

  if (result === true) {
    return (
      <>
        {errorEdit && result === true ? (
          <Result
            key="error"
            status="error"
            title="Erro!"
            subTitle="Alguma coisa deu errado."
            extra={[
              <Button key="bt" type="primary" onClick={() => handleCancel()}>
                Finalizar
              </Button>,
            ]}
          />
        ) : (
          <Result
            key="sucesso"
            status="success"
            title="Sucesso!"
            subTitle="Sua informação foi adicionada com sucesso."
            extra={[
              <Button key="btn" type="primary" onClick={() => handleCancel()}>
                Finalizar
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

export default EditResultProduction;
