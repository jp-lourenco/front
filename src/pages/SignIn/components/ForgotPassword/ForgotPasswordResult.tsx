import React, { useContext } from 'react';
import { Button, Result } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SignInContext } from '../../SignIn';
import { resetResultChangePassword } from '../../../../store/modules/auth/actions';

const ResetPasswordResult: React.FC = () => {
  const { resultChangePassword } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const { setVisibleForgotPasswordModal } = useContext(SignInContext);

  const handleCancel = () => {
    setVisibleForgotPasswordModal(false);
    dispatch(resetResultChangePassword());
  };

  if (resultChangePassword === true) {
    return (
      <Result
        key="sucesso"
        status="success"
        title="Sucesso!"
        subTitle="Sua senha foi trocada com sucesso!!"
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

export default ResetPasswordResult;
