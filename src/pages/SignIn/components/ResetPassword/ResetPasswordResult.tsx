import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { SignInContext } from '../../SignIn';
import { ResetPasswordContext } from './ResetPasswordModal';

const ResetPasswordResult = () => {
  const { resetPasswordError, messageResetPassword } = useSelector(
    (state: any) => state.auth,
  );

  const { setVisibleResetPasswordModal } = useContext(SignInContext);

  const { result, setResult } = useContext(ResetPasswordContext);

  const handleCancel = () => {
    setVisibleResetPasswordModal(false);
    setResult(false);
  };

  if (result === true) {
    return (
      <>
        {resetPasswordError && result === true ? (
          <Result
            key="error"
            status="error"
            title="Erro!"
            subTitle={`${messageResetPassword?.toString()}`}
            extra={[
              <Button key="novamente" onClick={() => setResult(false)}>
                Tentar novamente
              </Button>,
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
            subTitle="Verifique seu email."
            extra={[
              <Button key="btn" onClick={() => handleCancel()}>
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

export default ResetPasswordResult;
