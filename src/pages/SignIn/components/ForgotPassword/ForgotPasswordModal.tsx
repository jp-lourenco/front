import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { SignInContext } from '../../SignIn';
import ForgotPasswordForm from './ForgotPasswordForm';
import ForgotPasswordResult from './ForgotPasswordResult';

const ForgotPasswordModal: React.FC = () => {
  const {
    visibleForgotPasswordModal,
    setVisibleForgotPasswordModal,
  } = useContext(SignInContext);

  const { loadingChangePasswordRequest, resultChangePassword } = useSelector(
    (state: any) => state.auth,
  );

  return (
    <Modal
      visible={visibleForgotPasswordModal}
      title={`Esqueceu a palavra-passe`}
      onOk={() => setVisibleForgotPasswordModal(false)}
      onCancel={() => {}}
      closable={false}
      footer={false}
      width={350}
    >
      {resultChangePassword === false ? (
        <ForgotPasswordForm />
      ) : (
        [
          loadingChangePasswordRequest ? (
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          ) : (
            <ForgotPasswordResult />
          ),
        ]
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
