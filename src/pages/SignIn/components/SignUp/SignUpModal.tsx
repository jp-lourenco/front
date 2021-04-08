import React, { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { SignInContext } from '../../SignIn';
import SignUpForm from './SignUpForm';
import SignUpResult from './SignUpResult';

export const SignUpContext = createContext({
  result: false,
  setResult: (result: boolean) => {},
});

const SignUpModal: React.FC = () => {
  const { visibleSignUpModal, setVisibleSignUpModal } = useContext(
    SignInContext,
  );

  const [result, setResult] = useState<boolean>(false);

  const { loadingSignUpRequest } = useSelector((state: any) => state.auth);

  return (
    <SignUpContext.Provider value={{ result, setResult }}>
      <Modal
        visible={visibleSignUpModal}
        title={`Solicitar Acesso`}
        onOk={() => setVisibleSignUpModal(false)}
        onCancel={() => {}}
        closable={false}
        footer={false}
        width={350}
      >
        {result === false ? (
          <SignUpForm />
        ) : (
          [
            loadingSignUpRequest ? (
              <LoadingOutlined
                key="LoadingOutlined"
                style={{ fontSize: 24 }}
                spin
              />
            ) : (
              <SignUpResult key="SignUpResult" />
            ),
          ]
        )}
      </Modal>
    </SignUpContext.Provider>
  );
};

export default SignUpModal;
