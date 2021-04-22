import { Button, Result } from 'antd';
import React, { useContext } from 'react';
import { ProfileContext } from '../../Profile';
import { UpdatePasswordContext } from './UpdatePasswordModal';

const UpdatePasswordResult: React.FC = () => {
  const { setVisibleUpdatePasswordModal } = useContext(ProfileContext);

  const { result, setResult } = useContext(UpdatePasswordContext);

  const handleCancel = () => {
    setVisibleUpdatePasswordModal(false);
    setResult(false);
  };

  if (result === true) {
    return (
      <Result
        key="sucesso"
        status="success"
        title="Sucesso!"
        subTitle="Sua palavra-passe foi editada com sucesso!!"
        extra={[
          <Button key="btn" onClick={() => handleCancel()}>
            Finalizar
          </Button>,
        ]}
      />
    );
  } else {
    return <></>;
  }
};

export default UpdatePasswordResult;
