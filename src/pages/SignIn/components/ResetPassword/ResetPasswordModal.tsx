import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { SignInContext } from '../../SignIn';
import ResetPasswordForm from './ResetPasswordForm';
import ResetPasswordResult from './ResetPasswordResult';

export const ResetPasswordContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const ResetPasswordModal: React.FC = () => {
  const {
    visibleResetPasswordModal,
    setVisibleResetPasswordModal,
  } = useContext(SignInContext);

  const [result, setResult] = useState<boolean>(false);

  const { loadingResetPasswordRequest } = useSelector(
    (state: any) => state.auth,
  );

  return (
    <ResetPasswordContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleResetPasswordModal}
        title={`Recuperar conta`}
        onOk={() => setVisibleResetPasswordModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <ResetPasswordForm />
        ) : (
          [
            loadingResetPasswordRequest ? (
              <LoadingOutlined style={{ fontSize: 24 }} spin />
            ) : (
              <ResetPasswordResult />
            ),
          ]
        )}
      </Modal>
    </ResetPasswordContext.Provider>
  );
};

export default ResetPasswordModal;
