import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector } from 'react-redux';
import { SignInContext } from '../../SignIn';
import { SignUpContext } from './SignUpModal';

const SignUpResult = () => {
  const { signUpError, msgSignUp } = useSelector((state: any) => state.auth);

  const { setVisibleSignUpModal } = useContext(SignInContext);

  const { result, setResult } = useContext(SignUpContext);

  const handleCancel = () => {
    setVisibleSignUpModal(false);
    setResult(false);
  };

  if (result === true) {
    return (
      <>
        {signUpError ? (
          <Result
            key="error"
            status="error"
            title="Erro!"
            subTitle={`${msgSignUp?.toString()}`}
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
            subTitle="Sua solicitação de acesso foi registrada com sucesso."
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

export default SignUpResult;
